import { Router } from "express";
import {
  getAllBankDetails,
  updateBankDetailsById,
} from "../../controllers/bankdetails";
import { updateBankDetailsByIdUtil } from "utility/bankdetails";

const router = Router();

// get all bank account
router.get("/", getAllBankDetails);

// update account
router.put("/:id", updateBankDetailsById);

export default router;
