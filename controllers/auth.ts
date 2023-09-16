import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const models = require("../libs/shared/src/sequelize/models");
const ENV: any = process.env;
const { customers } = models;
const router = Router();

// get account
export async function testMiddleware(req: any, res: any) {
  try {
    res.send({ success: true, message: "Middleware running fine......" });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
// sigin
export async function signInAccount(req: any, res: any) {
  try {
    const { customerId, password } = req.body;
    const acc = await customers.findOne({
      where: { customerId },
    });
    // Check if the user exists
    if (!acc) {
      return res.send(401); // User not found
    } else {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, acc.password);
      if (passwordMatch) {
        const {
          id: accountId,
          customerId,
          firstName,
          productId,
          accountType,
        } = acc;
        const { token: accessToken, refreshToken } = generateTokens(
          { accountId, customerId, firstName, productId, accountType },
          ENV.MYB_SECRET,
          "1d",
          "2d"
        );
        res.cookie("accessToken", accessToken, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.cookie("refreshToken", refreshToken, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return res.send({
          customer: {
            accountId,
            customerId,
            firstName,
            productId,
            accountType,
          },
        }); // Passwords match, authentication successful
      } else {
        return res.send(401); // Passwords don't match, authentication failed
      }
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

function generateTokens(
  payload: any,
  secret: string,
  expiresIn: string,
  refreshExpiresIn: string
) {
  const token = jwt.sign(payload, secret, { expiresIn });
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: refreshExpiresIn,
  });

  return { token, refreshToken };
}
export default router;
