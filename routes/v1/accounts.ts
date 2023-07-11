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

// get all account
router.get("/:id", getAccount);

// get account
router.get("/", getAllAccount);

// update account
router.put("/:id", updateAccount);

// delete account
router.delete("/:id", deleteAccount);

export default router;
