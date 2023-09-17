import { Router } from "express";
const router = Router();
import {
  getCustomerSettlements,
  getSettlementsById,
} from "../../controllers/settlements";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
router.get("/", getCustomerSettlements);
router.get("/:id", getSettlementsById);

export default router;
