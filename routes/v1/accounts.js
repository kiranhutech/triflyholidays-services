"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../../controllers/accounts");
const router = (0, express_1.Router)();
// create account
router.post("/signup", accounts_1.signup);
// get all account
router.get("/:id", accounts_1.getAccount);
// get account
router.get("/", accounts_1.getAllAccount);
// update account
router.put("/:id", accounts_1.updateAccount);
// delete account
router.delete("/:id", accounts_1.deleteAccount);
exports.default = router;
