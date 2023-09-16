import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../../controllers/profile";

const router = Router();

// profiles APIs
router.get("/", getMyProfile);
router.put("/", updateMyProfile);

export default router;
