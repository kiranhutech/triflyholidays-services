import { Router } from "express";
import {
  deleteAccount,
  getAccount,
  getAllAccount,
  signup,
  updateAccount,
} from "../../controllers/accounts";
import { customerAuthMiddleware } from "../../utility/middleware";

const router = Router();

// create account
router.post("/signup", signup);

// get account
router.get("/get/info", customerAuthMiddleware, (req: any, res) => {
  console.log("!@@#$%");
  const { customer } = req.locals;
  res.send({ customer });
});

// get account
router.get("/:id", getAccount);

// get all account
router.get("/", getAllAccount);

// update account
router.put("/:id", updateAccount);

// delete account
router.delete("/:id", deleteAccount);

export default router;
