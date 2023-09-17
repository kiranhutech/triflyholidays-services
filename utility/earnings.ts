import { UUID } from "crypto";
const models = require("../libs/shared/src/sequelize/models");
const { earnings } = models;

export async function getMyEarningsUtil(
  customerId: any,
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const where = { customerId };
    const { count, rows: earning }: any = await earnings.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { earnings: earning, count };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get customer earnings by id
export async function getEarningsByIdUtil(id: UUID) {
  try {
    const earning: any = await earnings.findByPk(id);
    return earning
      ? { earnings: [earning?.get()] }
      : { errors: ["No earnigs found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get all customer earnings
export async function getCustomerEraningsUtil(
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const where = {};
    const { count, rows: earning }: any = await earnings.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { count, earnings: earning };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}
