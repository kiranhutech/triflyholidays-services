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
      countryCode = 91,
      isActive,
      emailVerified,
      phoneVerified,
      accountType,
      uttr,
    } = req?.body || {};
    const password = "123456"; //generateStrongPassword();
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
      attributes: { exclude: ["password"] },
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
    const prod = await accounts.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
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
    res.send({
      success: true,
      message: "Account updated successfuly",
      account: {},
    });
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

function generateStrongPassword() {
  const length = 8;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_-+=";

  const allCharacters = lowercase + uppercase + numbers + symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}
