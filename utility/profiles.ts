import { UUID } from "crypto";

const models = require("../libs/shared/src/sequelize/models");
const { profiles } = models;

export async function getMyProfileUtil(customerId: UUID) {
  try {
    const profile = await profiles.findOne({
      where: { customerId },
    });
    return profile
      ? { profiles: [profile?.get()] }
      : { errors: ["Account not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

export async function updateMyProfileUtil(customerId: UUID, profileInfo: any) {
  try {
    const [count, profile] = await profiles.update(profileInfo, {
      where: { customerId },
      returning: true,
    });
    return count > 0
      ? { customers: profile }
      : { errors: ["Account not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

export async function getCustomersProfileUtil(
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const where = {};
    const { count, rows }: any = await profiles.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return { count, profiles: rows };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

export async function getCustomersProfileByIdUtil(id: UUID) {
  try {
    const profile = await profiles.findByPk(id);
    return profile
      ? { profiles: [profile?.get()] }
      : { errors: ["Account not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

export async function updateProfileByIdUtil(id: UUID, profileInfo: any) {
  try {
    const [count, profile] = await profiles.update(profileInfo, {
      where: { id },
      returning: true,
    });
    return count > 0
      ? { customers: profile }
      : { errors: ["Account not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}
