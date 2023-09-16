import { Router } from "express";
import {
  addNewCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} from "../../controllers/customers";

const router = Router();

// create account
router.post("/", addNewCustomer);

// get account
router.get("/:id", getCustomerById);

// get all account
router.get("/", getAllCustomer);

// update account
router.put("/:id", updateCustomerById);

// delete account
router.delete("/:id", deleteCustomerById);

export default router;
