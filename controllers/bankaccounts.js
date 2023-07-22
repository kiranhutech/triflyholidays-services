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
exports.updateBankAccount = exports.getBankAccount = void 0;
const models = require("../libs/shared/src/sequelize/models");
const { accounts, bankaccounts } = models;
// signup
function getBankAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: accountId } = req === null || req === void 0 ? void 0 : req.params;
            const [bankInfo, created] = yield bankaccounts.findOrCreate({
                where: { accountId },
                defaults: { accountId },
            });
            res.send({ success: true, bankInfo });
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
exports.getBankAccount = getBankAccount;
// update account
function updateBankAccount(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const [count, rows] = yield bankaccounts.update(req.body, {
                where: { id },
                returning: true,
            });
            if (count > 0)
                res.send({
                    success: true,
                    message: "Bank details updated successfuly",
                    bankInfo: rows[0],
                });
            else
                res.status(500).json({
                    success: false,
                    message: "failed to update bank details!, Try again",
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
exports.updateBankAccount = updateBankAccount;
