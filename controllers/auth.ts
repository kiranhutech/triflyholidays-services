import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const models = require("../libs/shared/src/sequelize/models");
const ENV: any = process.env;
const { accounts } = models;
const router = Router();

// sigin
export async function signInAccount(req: any, res: any) {
  try {
    const { customerId, password } = req.body;
    const acc = await accounts.findOne({
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
          id: userId,
          customerId,
          fullName,
          productId,
          accountType,
        } = acc;
        const { token: accessToken, refreshToken } = generateTokens(
          { id: userId, customerId, fullName, productId, accountType },
          ENV.MYB_SECRET,
          "1d",
          "2d"
        );
        return res.send({ accessToken, refreshToken }); // Passwords match, authentication successful
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
