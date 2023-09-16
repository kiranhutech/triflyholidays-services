import jwt from "jsonwebtoken";
const ENV: any = process.env;
export function customerAuthMiddleware(req: any, res: any, next: any) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (token) {
      const validToken: any = verifyToken(token);
      if (validToken && validToken?.accountType === "customer") {
        req["locals"] = { customer: validToken };
        next();
      } else {
        res.send(401);
      }
    } else {
      res.send(401);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export function adminAuthMiddleware(req: any, res: any, next: any) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    if (token) {
      const validToken: any = verifyToken(token);
      if (validToken && validToken?.accountType === "superadmin") {
        req["locals"] = { customer: validToken };
        next();
      } else {
        res.send(401);
      }
    } else {
      res.send(401);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, ENV.MYB_SECRET);
    return decoded;
  } catch (error) {
    // Token verification failed
    console.error("Token verification failed:", error);
    return null;
  }
}
