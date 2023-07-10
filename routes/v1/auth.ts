import { signInAccount } from "../../controllers/auth";
import { Router } from "express";
const router = Router();

// sigin
router.post("/signin", signInAccount);
export default router;
