import { Router } from "express";
const router = Router();
import {
  addNewCustomer,
  getCustomerById,
  updateCustomerById,
} from "../../controllers/customers";
import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);
// create account
router.post("/", addNewCustomer);

// get account
router.get("/:id", getCustomerById);

// update account
router.put("/:id", updateCustomerById);

export default router;
