const models = require("../libs/shared/src/sequelize/models");
const { accounts, bankaccounts } = models;

// signup
export async function getBankAccount(req: any, res: any) {
  try {
    const { id: accountId } = req?.params;
    const [bankInfo, created]: [any, boolean] = await bankaccounts.findOrCreate(
      {
        where: { accountId },
        defaults: { accountId },
      }
    );
    res.send({ success: true, bankInfo });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update account
export async function updateBankAccount(req: any, res: any) {
  try {
    const { id } = req.params;
    const [count, rows] = await bankaccounts.update(req.body, {
      where: { id },
      returning: true,
    });
    if (count > 0)
      res.send({
        success: true,
        message: "Bank details updated successfuly",
        bankInfo: rows[0],
      });
    else
      res.status(500).json({
        success: false,
        message: "failed to update bank details!, Try again",
      });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
