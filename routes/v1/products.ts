import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../../controllers/products";
const router = Router();

// create products
router.post("/", createProduct);

// get all products
router.get("/:id", getProduct);

// get products
router.get("/", getAllProduct);

// update products
router.put("/:id", updateProduct);

// delete products
router.delete("/:id", deleteProduct);

export default router;
