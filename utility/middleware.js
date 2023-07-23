"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ENV = process.env;
function customerAuthMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const validToken = verifyToken(token);
        if (validToken) {
            req["locals"] = { customer: validToken };
            next();
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
}
exports.customerAuthMiddleware = customerAuthMiddleware;
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ENV.MYB_SECRET);
        return decoded;
    }
    catch (error) {
        // Token verification failed
        console.error("Token verification failed:", error);
        return null;
    }
}
