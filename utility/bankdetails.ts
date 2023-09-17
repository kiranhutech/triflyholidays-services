import { UUID } from "crypto";
const models = require("../libs/shared/src/sequelize/models");
const { bankdetails } = models;

// get customer bank details
export async function getMyBankDetailsUtil(customerId: UUID) {
  try {
    const [bankdetail, created]: [any, boolean] =
      await bankdetails.findOrCreate({
        where: { customerId },
      });
    return bankdetail
      ? { bankdetails: [bankdetail?.get()] }
      : { errors: ["Something went wrong!, Try again"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// update customer bank details
export async function updateMyBankDetailsUtil(customerId: UUID, bankInfo: any) {
  try {
    const [count, bankdetail] = await bankdetails.update(bankInfo, {
      where: { customerId },
      returning: true,
    });
    return count > 0
      ? { bankdetails: bankdetail }
      : { errors: ["Bank detail not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get customer bank details by id
export async function getBankDetailsByIdUtil(customerId: UUID) {
  try {
    const bankdetail: any = await bankdetails.findOne({
      where: { customerId },
    });
    return bankdetail
      ? { bankdetails: [bankdetail?.get()] }
      : { errors: ["No bank details found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get all customer bank details
export async function getAllBankDetailsUtil(
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const where = {};
    const { count, rows: bankdetail }: any = await bankdetails.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { count, bankdetails: bankdetail };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// update customer bank profile
export async function updateBankDetailsByIdUtil(id: UUID, bankInfo: any) {
  try {
    const [count, profile] = await bankdetails.update(bankInfo, {
      where: { id },
      returning: true,
    });
    return count > 0
      ? { customers: profile }
      : { errors: ["Bank details not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}
