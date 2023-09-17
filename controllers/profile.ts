import {
  getCustomersProfileByIdUtil,
  getCustomersProfileUtil,
  getMyProfileUtil,
  updateMyProfileUtil,
  updateProfileByIdUtil,
} from "../utility/profiles";

const models = require("../libs/shared/src/sequelize/models");

export async function getMyProfile(req: any, res: any): Promise<any> {
  try {
    const { accountId: customerId } = req.locals;
    const profiles = await getMyProfileUtil(customerId);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function updateMyProfile(req: any, res: any) {
  try {
    const { accountId: customerId } = req?.locals;
    const profiles = await updateMyProfileUtil(customerId, req.body);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getCustomersProfile(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const profiles = await getCustomersProfileUtil(offset, limit, search);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getCustomersProfileById(req: any, res: any) {
  try {
    const profiles = await getCustomersProfileByIdUtil(req?.params?.id);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function updateCustomersProfileById(req: any, res: any) {
  try {
    const profiles = await updateProfileByIdUtil(req.params.id, req.body);
    if (!profiles?.errors) res.send(profiles);
    else res.status(500).json(profiles);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
