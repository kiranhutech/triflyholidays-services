import {
  getMySettlementsUtil,
  getSettlementsByIdUtil,
  getCustomerSettlementsUtil,
} from "utility/settlements";
import { getProfileByIdUtil, updateProfileByIdUtil } from "../utility/profiles";

// get customer by id
export async function getMySettlements(req: any, res: any) {
  try {
    const { customerId } = req?.locals;
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const settlements = await getMySettlementsUtil(
      customerId,
      offset,
      limit,
      search
    );
    if (!settlements?.errors) res.send(settlements);
    else res.status(500).json(settlements);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getSettlementsById(req: any, res: any) {
  try {
    const settlements = await getSettlementsByIdUtil(req.params.id);
    if (!settlements?.errors) res.send(settlements);
    else res.status(500).json(settlements);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getCustomerSettlements(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const settlements = await getCustomerSettlementsUtil(offset, limit, search);
    if (!settlements?.errors) res.send(settlements);
    else res.status(500).json(settlements);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
