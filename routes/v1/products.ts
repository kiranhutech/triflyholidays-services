import { Router } from "express";
import { getProductById, getAllProduct } from "../../controllers/products";
const router = Router();

// get products by id
router.get("/:id", getProductById);

// get all products
router.get("/", getAllProduct);

export default router;
