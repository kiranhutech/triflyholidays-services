"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bankaccounts_1 = require("../../controllers/bankaccounts");
const router = (0, express_1.Router)();
// get or create bank account
router.get("/:id", bankaccounts_1.getBankAccount);
// update account
router.put("/:id", bankaccounts_1.updateBankAccount);
exports.default = router;
