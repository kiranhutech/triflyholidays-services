import { Router } from "express";
import {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/products";
const router = Router();

// create products
router.post("/", createProduct);

// get all products
router.get("/:id", getProductById);

// get products
router.get("/", getAllProduct);

// update products
router.put("/:id", updateProduct);

// delete products
router.delete("/:id", deleteProduct);

export default router;
