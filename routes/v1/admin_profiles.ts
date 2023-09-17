import { Router } from "express";
const router = Router();
import {
  getCustomersProfile,
  getCustomersProfileById,
  updateCustomersProfileById,
} from "../../controllers/profile";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
router.get("/", getCustomersProfile);
router.get("/:id", getCustomersProfileById);
router.put("/:id", updateCustomersProfileById);

export default router;
