import { Router } from "express";
import {
  getCustomerEranings,
  getEarningsById,
  getMyEarnings,
} from "../../controllers/earnings";

const router = Router();

//get all earnings
router.put("/", getCustomerEranings);

// get earnings by id
router.put("/:id", getEarningsById);

export default router;
