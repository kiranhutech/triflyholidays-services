import { Router } from "express";
const router = Router();
import { getProductById, getAllProduct } from "../../controllers/products";

// get all products
router.get("/", getAllProduct);

// get products by id
router.get("/:id", getProductById);

export default router;
