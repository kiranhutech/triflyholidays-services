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
exports.deleteAccount = exports.updateAccount = exports.getAccount = exports.getAllAccount = exports.signup = void 0;
const models = require("../libs/shared/src/sequelize/models");
const { accounts } = models;
// signup
function signup(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId, fullName, email, mobile, countryCode = 91, isActive, emailVerified, phoneVerified, accountType, uttr, } = (req === null || req === void 0 ? void 0 : req.body) || {};
            const password = "123456"; //generateStrongPassword();
            const registered = yield accounts.create({
                productId,
                fullName,
                email,
                mobile,
                password,
                countryCode,
                isActive,
                emailVerified,
                phoneVerified,
                accountType,
                uttr,
            });
            if (registered) {
                res.send({
                    success: true,
                    message: "Accounts successfuly registered",
                    account: registered,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "Something went wrong try again",
                    account: null,
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
exports.signup = signup;
// get all account
function getAllAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { offset = 0, limit = 20 } = (req === null || req === void 0 ? void 0 : req.query) || {};
            const { count: totalAccounts, rows } = yield accounts.findAndCountAll({
                where: { isArchived: null },
                attributes: { exclude: ["password"] },
                order: [["createdAt", "DESC"]],
                offset,
                limit,
            });
            res.send({
                success: true,
                message: "Accounts found",
                totalAccounts,
                accounts: rows,
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
exports.getAllAccount = getAllAccount;
// get account by id
function getAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const prod = yield accounts.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (prod) {
                res.send({
                    success: true,
                    message: "Account found",
                    account: prod,
                });
            }
            else {
                res.send({
                    success: true,
                    message: "Account not found",
                    accounts: prod,
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
exports.getAccount = getAccount;
// update account
function updateAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send({
                success: true,
                message: "Account updated successfuly",
                account: {},
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
exports.updateAccount = updateAccount;
// delete account
function deleteAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const [count, rows] = yield accounts.update({ isArchived: new Date().toISOString() }, { where: { id }, returning: true });
            if (count > 0) {
                res.send({
                    success: true,
                    message: "Account updated successfuly",
                    account: (rows === null || rows === void 0 ? void 0 : rows[0]) || {},
                });
            }
            else {
                res.status(400).json({ success: false, message: "Account not found" });
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
exports.deleteAccount = deleteAccount;
function generateStrongPassword() {
    const length = 8;
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*_-+=";
    const allCharacters = lowercase + uppercase + numbers + symbols;
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    return password;
}
