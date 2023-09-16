import { Router } from "express";
import {
  getMySettlements,
  getSettlementsById,
} from "../../controllers/settlements";

const router = Router();

router.get("/", getMySettlements);
router.get("/:id", getSettlementsById);

export default router;
