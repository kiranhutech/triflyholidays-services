"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../controllers/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
// sigin
router.post("/signin", auth_1.signInAccount);
exports.default = router;
