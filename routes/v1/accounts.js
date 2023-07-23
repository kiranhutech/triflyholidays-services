"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_1 = require("../../controllers/accounts");
const middleware_1 = require("../../utility/middleware");
const router = (0, express_1.Router)();
// create account
router.post("/signup", accounts_1.signup);
// get account
router.get("/get/info", middleware_1.customerAuthMiddleware, (req, res) => {
    console.log("!@@#$%");
    const { customer } = req.locals;
    res.send({ customer });
});
// get account
router.get("/:id", accounts_1.getAccount);
// get all account
router.get("/", accounts_1.getAllAccount);
// update account
router.put("/:id", accounts_1.updateAccount);
// delete account
router.delete("/:id", accounts_1.deleteAccount);
exports.default = router;
