import { Router } from "express";
const router = Router();
import { getProductById, getAllProduct } from "../../controllers/products";
import { customerAuthMiddleware } from "../../utility/middleware";

router.use(customerAuthMiddleware);

// get all products
router.get("/", getAllProduct);

// get products by id
router.get("/:id", getProductById);

export default router;
