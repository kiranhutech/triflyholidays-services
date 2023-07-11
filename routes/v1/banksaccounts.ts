import { Router } from "express";
import {
  getBankAccount,
  updateBankAccount,
} from "../../controllers/bankaccounts";

const router = Router();

// get or create bank account
router.get("/:id", getBankAccount);

// update account
router.put("/:id", updateBankAccount);

export default router;
