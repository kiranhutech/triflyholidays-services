import { Router } from "express";
import auth from "./auth";
import account from "./accounts";
import product from "./products";
import banksaccounts from "./banksaccounts";

const router = Router();

router.use("/product", product);
router.use("/account", account);
router.use("/auth", auth);
router.use("/bank", banksaccounts);

export default router;
