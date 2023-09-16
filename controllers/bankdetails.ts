import {
  getAllBankDetailsUtil,
  getMyBankDetailsUtil,
  updateMyBankDetailsUtil,
} from "../utility/bankdetails";

// signup
export async function getMyBankAccount(req: any, res: any) {
  try {
    const { accountId: customerId } = req?.locals;
    const bankDetails = await getMyBankDetailsUtil(customerId);
    if (!bankDetails?.errors) res.send(bankDetails);
    else res.status(500).json(bankDetails);
  } catch (error: any) {
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update account
export async function updateMyBankDetails(req: any, res: any) {
  try {
    const { accountId: customerId } = req?.locals;
    const bankDetails = await updateMyBankDetailsUtil(customerId, req.body);
    if (!bankDetails?.errors) res.send(bankDetails);
    else res.status(500).json(bankDetails);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function getAllBankDetails(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const bankDetails = await getAllBankDetailsUtil(offset, limit, search);
    if (!bankDetails?.errors) res.send(bankDetails);
    else res.status(500).json(bankDetails);
  } catch (error: any) {
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

export async function updateBankDetailsById(req: any, res: any) {
  try {
    const bankDetails = await updateMyBankDetailsUtil(
      req?.params?.id,
      req.body
    );
    if (!bankDetails?.errors) res.send(bankDetails);
    else res.status(500).json(bankDetails);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
