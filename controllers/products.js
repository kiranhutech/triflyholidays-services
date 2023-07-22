"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProduct = exports.createProduct = void 0;
const models = require("../libs/shared/src/sequelize/models");
const { products } = models;
// create product
function createProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productName } = (req === null || req === void 0 ? void 0 : req.body) || {};
            if (productName) {
                const existing = yield products.findOne({
                    where: { productName, isArchived: null },
                });
                if (existing) {
                    res
                        .status(400)
                        .json({ success: false, message: "Product Name should be unique" });
                }
                else {
                    const registered = yield products.create({ productName });
                    res.send({
                        success: true,
                        message: "Product created successfuly",
                        product: registered,
                    });
                }
            }
            else {
                res
                    .status(400)
                    .json({ success: false, message: "Product name is missing" });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.createProduct = createProduct;
// get all product
function getAllProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { offset = 0, limit = 20 } = (req === null || req === void 0 ? void 0 : req.query) || {};
            const { count: totalProducts, rows } = yield products.findAndCountAll({
                where: { isArchived: null },
                order: [["createdAt", "DESC"]],
                offset,
                limit,
            });
            res.send({
                success: true,
                message: "Products found",
                totalProducts,
                products: rows,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.getAllProduct = getAllProduct;
// get product by id
function getProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const prod = yield products.findByPk(id);
            if (prod) {
                res.send({
                    success: true,
                    message: "Product found",
                    product: prod,
                });
            }
            else {
                res.send({
                    success: true,
                    message: "Product not found",
                    products: prod,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.getProduct = getProduct;
// update product
function updateProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productName } = (req === null || req === void 0 ? void 0 : req.body) || {};
            const { id } = req.params;
            const [count, rows] = yield products.update({ productName }, { where: { id }, returning: true });
            if (count > 0) {
                res.send({
                    success: true,
                    message: "Product updated successfuly",
                    product: (rows === null || rows === void 0 ? void 0 : rows[0]) || {},
                });
            }
            else {
                res.status(400).json({ success: false, message: "Product not found" });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.updateProduct = updateProduct;
// delete product
function deleteProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const [count, rows] = yield products.update({ isArchived: new Date().toISOString() }, { where: { id }, returning: true });
            if (count > 0) {
                res.send({
                    success: true,
                    message: "Product updated successfuly",
                    product: (rows === null || rows === void 0 ? void 0 : rows[0]) || {},
                });
            }
            else {
                res.status(400).json({ success: false, message: "Product not found" });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.deleteProduct = deleteProduct;
