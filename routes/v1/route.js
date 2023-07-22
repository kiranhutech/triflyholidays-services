"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const accounts_1 = __importDefault(require("./accounts"));
const products_1 = __importDefault(require("./products"));
const banksaccounts_1 = __importDefault(require("./banksaccounts"));
const router = (0, express_1.Router)();
router.use("/product", products_1.default);
router.use("/account", accounts_1.default);
router.use("/auth", auth_1.default);
router.use("/bank", banksaccounts_1.default);
exports.default = router;
