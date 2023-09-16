import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../../controllers/profile";

const router = Router();

// get account
router.get("/", getMyProfile);

// update account-
router.put("/", updateMyProfile);

export default router;
