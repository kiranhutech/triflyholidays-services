import { Router } from "express";
import {
  addNewCustomer,
  getCustomerById,
  updateCustomerById,
} from "../../controllers/customers";

const router = Router();

// create account
router.post("/", addNewCustomer);

// get account
router.get("/:id", getCustomerById);

// update account
router.put("/:id", updateCustomerById);

export default router;
