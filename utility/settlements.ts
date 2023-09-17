import { UUID } from "crypto";
const models = require("../libs/shared/src/sequelize/models");
const { settlements } = models;

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
  search = null
) {
  try {
    const where = {};
    const { count, rows: settlement }: any = await settlements.findAndCountAll({
      where,
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
