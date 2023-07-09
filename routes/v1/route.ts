import { Router } from "express";
import auth from "../../controllers/auth";
import account from "./accounts";
import product from "./products";

const router = Router();

router.use("/product", product);
router.use("/account", account);
router.use("/auth", auth);

export default router;
