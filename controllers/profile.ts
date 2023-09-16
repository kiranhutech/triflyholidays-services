import { getProfileByIdUtil, updateProfileByIdUtil } from "../utility/profiles";

const models = require("../libs/shared/src/sequelize/models");

// get customer by id
export async function getMyProfile(req: any, res: any) {
  try {
    const { customerId } = req?.locals;
    const profiles = await getProfileByIdUtil(customerId);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update customer
export async function updateMyProfile(req: any, res: any) {
  try {
    const { customerId } = req?.locals;
    const profiles = await updateProfileByIdUtil(customerId, req.body);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
