import { Router } from "express";
const router = Router();
import {
  getMySettlements,
  getSettlementsById,
} from "../../controllers/settlements";

import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);
router.get("/", getMySettlements);
router.get("/:id", getSettlementsById);

export default router;
