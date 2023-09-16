import { Router } from "express";
import {
  getCustomersProfile,
  getCustomersProfileById,
  updateCustomersProfileById,
} from "../../controllers/profile";

const router = Router();

router.get("/", getCustomersProfile);
router.get("/:id", getCustomersProfileById);
router.put("/:id", updateCustomersProfileById);

export default router;
