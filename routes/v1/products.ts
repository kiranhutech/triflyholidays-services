import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../../controllers/products";
import { customerAuthMiddleware } from "../../utility/middleware";
const router = Router();

// create products
router.post("/", customerAuthMiddleware, createProduct);

// get all products
router.get("/:id", getProduct);

// get products
router.get("/", getAllProduct);

// update products
router.put("/:id", updateProduct);

// delete products
router.delete("/:id", deleteProduct);

export default router;
