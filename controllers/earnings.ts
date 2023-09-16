import {
  getCustomerEraningsUtil,
  getEarningsByIdUtil,
  getMyEarningsUtil,
} from "../utility/earnings";

// get customer by id
export async function getMyEarnings(req: any, res: any) {
  try {
    const { accountId: customerId } = req?.locals;
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const earning = await getMyEarningsUtil(customerId, offset, limit, search);
    if (!earning?.errors) res.send(earning);
    else res.status(500).json(earning);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getEarningsById(req: any, res: any) {
  try {
    const earning = await getEarningsByIdUtil(req.params.id);
    if (!earning?.errors) res.send(earning);
    else res.status(500).json(earning);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getCustomerEranings(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const earning = await getCustomerEraningsUtil(offset, limit, search);
    if (!earning?.errors) res.send(earning);
    else res.status(500).json(earning);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
