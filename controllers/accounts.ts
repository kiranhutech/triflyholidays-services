const models = require("../libs/shared/src/sequelize/models");
const { accounts } = models;

// signup
export async function signup(req: any, res: any) {
  try {
    const {
      productId,
      fullName,
      email,
      mobile,
      password,
      countryCode = 91,
      isActive,
      emailVerified,
      phoneVerified,
      accountType,
      uttr,
    } = req?.body || {};

    const registered = await accounts.create({
      productId,
      fullName,
      email,
      mobile,
      password,
      countryCode,
      isActive,
      emailVerified,
      phoneVerified,
      accountType,
      uttr,
    });
    console.log(registered);

    if (registered) {
      res.send({
        success: true,
        message: "Accounts successfuly registered",
        account: registered,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again",
        account: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get all account
export async function getAllAccount(req: any, res: any) {
  try {
    const { offset = 0, limit = 20 } = req?.query || {};
    const { count: totalAccounts, rows } = await accounts.findAndCountAll({
      where: { isArchived: null },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    res.send({
      success: true,
      message: "Accounts found",
      totalAccounts,
      accounts: rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get account by id
export async function getAccount(req: any, res: any) {
  try {
    const { id } = req.params;
    const prod = await accounts.findByPk(id);
    if (prod) {
      res.send({
        success: true,
        message: "Account found",
        account: prod,
      });
    } else {
      res.send({
        success: true,
        message: "Account not found",
        accounts: prod,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update account
export async function updateAccount(req: any, res: any) {
  try {
    const { accountName } = req?.body || {};
    const { id } = req.params;
    const [count, rows] = await accounts.update(
      { accountName },
      { where: { id }, returning: true }
    );
    if (count > 0) {
      res.send({
        success: true,
        message: "Account updated successfuly",
        account: rows?.[0] || {},
      });
    } else {
      res.status(400).json({ success: false, message: "Account not found" });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// delete account
export async function deleteAccount(req: any, res: any) {
  try {
    const { id } = req.params;
    const [count, rows] = await accounts.update(
      { isArchived: new Date().toISOString() },
      { where: { id }, returning: true }
    );
    if (count > 0) {
      res.send({
        success: true,
        message: "Account updated successfuly",
        account: rows?.[0] || {},
      });
    } else {
      res.status(400).json({ success: false, message: "Account not found" });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
