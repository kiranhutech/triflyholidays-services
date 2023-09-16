import { UUID } from "crypto";

const models = require("../libs/shared/src/sequelize/models");
const { profiles } = models;

// get customer profile by id
export async function getProfileByIdUtil(customerId: UUID) {
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

// update customer profile
export async function updateProfileByIdUtil(
  customerId: UUID,
  profileInfo: any
) {
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
