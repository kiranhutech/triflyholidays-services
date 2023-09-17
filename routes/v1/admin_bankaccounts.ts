import { Router } from "express";
const router = Router();
import {
  getAllBankDetails,
  getBankDetailsById,
  updateBankDetailsById,
} from "../../controllers/bankdetails";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
// get all bank account
router.get("/", getAllBankDetails);

// get bank details by Id
router.get("/:id", getBankDetailsById);

// update account
router.put("/:id", updateBankDetailsById);

export default router;
