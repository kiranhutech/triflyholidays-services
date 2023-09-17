import { Router } from "express";
const router = Router();
import {
  getAllBankDetails,
  updateBankDetailsById,
} from "../../controllers/bankdetails";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
// get all bank account
router.get("/", getAllBankDetails);

// update account
router.put("/:id", updateBankDetailsById);

export default router;
