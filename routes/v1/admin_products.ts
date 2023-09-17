import { Router } from "express";
const router = Router();
import {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/products";
import { adminAuthMiddleware } from "../../utility/middleware";

router.use(adminAuthMiddleware);
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
