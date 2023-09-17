import { Router } from "express";
const router = Router();
import {
  getMyBankAccount,
  updateMyBankDetails,
} from "../../controllers/bankdetails";

import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);
// get or create bank account
router.get("/", getMyBankAccount);

// update account
router.put("/", updateMyBankDetails);

export default router;
