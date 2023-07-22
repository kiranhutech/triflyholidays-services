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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInAccount = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models = require("../libs/shared/src/sequelize/models");
const ENV = process.env;
const { accounts } = models;
const router = (0, express_1.Router)();
// sigin
function signInAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("1111122ss");
            const { customerId, password } = req.body;
            console.log("1111122ss");
            const acc = yield accounts.findOne({
                where: { customerId },
            });
            // Check if the user exists
            if (!acc) {
                return res.send(401); // User not found
            }
            else {
                // Compare the provided password with the stored hashed password
                const passwordMatch = yield bcrypt_1.default.compare(password, acc.password);
                if (passwordMatch) {
                    const { id: userId, customerId, fullName, productId, accountType, } = acc;
                    const { token: accessToken, refreshToken } = generateTokens({ id: userId, customerId, fullName, productId, accountType }, ENV.MYB_SECRET, "1d", "2d");
                    return res.send({ accessToken, refreshToken }); // Passwords match, authentication successful
                }
                else {
                    console.log("11111229900ss", acc);
                    return res.send(401); // Passwords don't match, authentication failed
                }
            }
        }
        catch (error) {
            console.log("1111122ssq");
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                errors: [(_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.replaceAll("'")],
            });
        }
    });
}
exports.signInAccount = signInAccount;
function generateTokens(payload, secret, expiresIn, refreshExpiresIn) {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    const refreshToken = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: refreshExpiresIn,
    });
    return { token, refreshToken };
}
exports.default = router;
