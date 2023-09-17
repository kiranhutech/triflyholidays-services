import { Router } from "express";
const router = Router();
import {
  getCustomerEranings,
  getEarningsById,
  getMyEarnings,
} from "../../controllers/earnings";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
//get all earnings
router.get("/", getCustomerEranings);

// get earnings by id
router.get("/:id", getEarningsById);

export default router;
