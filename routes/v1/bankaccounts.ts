import { Router } from "express";
import {
  getMyBankAccount,
  updateMyBankDetails,
} from "../../controllers/bankdetails";

const router = Router();

// get or create bank account
router.get("/", getMyBankAccount);

// update account
router.put("/", updateMyBankDetails);

export default router;
