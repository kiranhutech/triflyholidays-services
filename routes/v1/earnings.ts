import { Router } from "express";
const router = Router();
import { getMyEarnings, getEarningsById } from "../../controllers/earnings";

import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);
router.get("/", getMyEarnings);
router.get("/:id", getEarningsById);

export default router;
