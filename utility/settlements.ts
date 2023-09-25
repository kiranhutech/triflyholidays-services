import { UUID } from "crypto";
import { Op } from "sequelize";
const models = require("../libs/shared/src/sequelize/models");
const { settlements, customers, profiles } = models;

export async function getMySettlementsUtil(
  customerId: any,
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const where = { customerId };
    const { count, rows: settlement }: any = await settlements.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { settlements: settlement, count };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get customer settlement by id
export async function getSettlementsByIdUtil(id: UUID) {
  try {
    const settlement: any = await settlements.findByPk(id);
    return settlement
      ? { settlements: [settlement?.get()] }
      : { errors: ["No settlement found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get all customer settlements
export async function getCustomerSettlementsUtil(
  offset = 0,
  limit = 10,
  search = null,
  d: any = null
) {
  try {
    let where = {};
    let searchWhere = {};
    let filterWhere = {};
    let from = 0;
    let to = new Date().getTime();
    if (d) {
      const daterange = d;
      if (!["today", "weekly", "monthly", "all"].includes(d)) {
        d = "daterange";
      }
      switch (d) {
        case "today": {
          from = new Date(new Date().toISOString().split("T")[0]).getTime();
          to =
            new Date(new Date().toISOString().split("T")[0]).getTime() +
            86400000 -
            1;
          break;
        }
        case "weekly": {
          const weekstart = new Date(
            new Date().setDate(new Date().getDate() - new Date().getDay())
          );
          from = new Date(
            new Date(weekstart).toISOString().split("T")[0]
          ).getTime();
          to = from + 7 * 86400000 - 1;
          break;
        }
        case "monthly": {
          const date = new Date();
          from = new Date(date.getFullYear(), date.getUTCMonth(), 1).getTime();
          to =
            new Date(date.getUTCFullYear(), date.getMonth() + 1, 0).getTime() +
            24 * 60 * 60 * 1000 -
            1;
          break;
        }
        case "daterange": {
          const [startDate, endDate = null] = daterange.split(":");
          if (startDate && endDate) {
            from = new Date(startDate).getTime();
            to = new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1;
          } else if (startDate) {
            from = new Date(startDate)?.getTime();
            to = new Date().getTime();
          }
          break;
        }
        default: {
          from = 0;
          to = new Date().getTime();
          break;
        }
      }
      filterWhere = {
        createdAt: { [Op.between]: [new Date(from), new Date(to)] },
      };
    }

    if (search) {
      searchWhere = {
        [Op.or]: [
          { "$customer.customerId$": { [Op.iLike]: `%${search}%` } },
          { "$customer.profile.firstName$": { [Op.iLike]: `%${search}%` } },
          { "$customer.profile.middleName$": { [Op.iLike]: `%${search}%` } },
          { "$customer.profile.lastName$": { [Op.iLike]: `%${search}%` } },
          { "$customer.profile.email$": { [Op.iLike]: `%${search}%` } },
          { "$customer.profile.mobile$": { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    console.log({ start: new Date(from), end: new Date(to) });

    const { count, rows: settlement }: any = await settlements.findAndCountAll({
      where: { [Op.and]: [{ ...searchWhere }, { ...filterWhere }] },
      attributes: [
        "id",
        "customerId",
        "settlementPeriod",
        "amountSettled",
        "totalAddedLeftWings",
        "totalAddedRightWings",
      ],
      include: [
        {
          model: customers,
          as: "customer",
          attributes: ["customerId"],
          include: [
            {
              model: profiles,
              as: "profile",
              attributes: ["firstName", "mobile", "email"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { count, settlements: settlement };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}
