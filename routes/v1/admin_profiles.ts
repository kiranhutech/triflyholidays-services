import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../../controllers/profile";

const router = Router();

// get account
router.get("/:id", getMyProfile);

// update account
router.put("/:id", updateMyProfile);

export default router;
