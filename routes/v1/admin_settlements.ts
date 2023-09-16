import { Router } from "express";
import {
  getCustomerSettlements,
  getSettlementsById,
} from "../../controllers/settlements";

const router = Router();

router.get("/", getCustomerSettlements);
router.get("/:id", getSettlementsById);

export default router;
