import { signInAccount, testMiddleware } from "../../controllers/auth";
import { Router } from "express";
import { customerAuthMiddleware } from "../../utility/middleware";
const router = Router();

//auth APIs
router.post("/signin", signInAccount);
export default router;
