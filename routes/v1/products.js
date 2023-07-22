"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../../controllers/products");
const middleware_1 = require("../../utility/middleware");
const router = (0, express_1.Router)();
// create products
router.post("/", middleware_1.customerAuthMiddleware, products_1.createProduct);
// get all products
router.get("/:id", products_1.getProduct);
// get products
router.get("/", products_1.getAllProduct);
// update products
router.put("/:id", products_1.updateProduct);
// delete products
router.delete("/:id", products_1.deleteProduct);
exports.default = router;
