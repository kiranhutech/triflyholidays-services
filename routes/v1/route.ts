import { Router } from "express";
import auth from "./auth";
import customer from "./customers";
import profile from "./profiles";
import bankDetails from "./bankaccounts";
import earnings from "./earnings";
import settlements from "./settlements";
import adminCustomer from "./admin_customers";
import adminProfiles from "./admin_profiles";
import adminBankDetails from "./admin_bankaccounts";
import adminEarnings from "./admin_earnings";
import product from "./products";
import {
  adminAuthMiddleware,
  customerAuthMiddleware,
} from "../../utility/middleware";

const router = Router();

// Public APIs
router.use("/auth", auth);

// Secure Customer APIs
router.use(customerAuthMiddleware);
router.use("/customer", customer);
router.use("/customer/profile", profile);
router.use("/customer/bankdetails", bankDetails);
router.use("/customer/earning", earnings);
router.use("/customer/settlements", settlements);

// Secure Admin APIs
router.use(adminAuthMiddleware);
router.use("/admin/product", product);
router.use("/admin/customer", adminCustomer);
router.use("/admin/customer/profile", adminProfiles);
router.use("/admin/customer/bankdetails", adminBankDetails);
router.use("/admin/customer/earning", adminEarnings);
router.use("/admin/customer/settlements", settlements);

export default router;
