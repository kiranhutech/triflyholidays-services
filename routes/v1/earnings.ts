import { Router } from "express";
import { getMyEarnings, getEarningsById } from "../../controllers/earnings";

const router = Router();

router.get("/", getMyEarnings);
router.get("/:id", getEarningsById);

export default router;
