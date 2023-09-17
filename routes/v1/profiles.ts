import { Router } from "express";
const router = Router();
import { getMyProfile, updateMyProfile } from "../../controllers/profile";
import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);

// profiles APIs
router.get("/", getMyProfile);
router.put("/", updateMyProfile);

export default router;
