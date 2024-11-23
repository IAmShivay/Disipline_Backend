"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.auth = void 0;
const axios_1 = __importDefault(require("axios"));
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401);
            throw new Error("Authentication required");
        }
        const verifyResponse = await axios_1.default.get("http://localhost:4000/api/auth/verify", { headers: { Authorization: `Bearer ${token}` } });
        req.user = verifyResponse.data;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).send({ error: "Authentication failed" });
    }
};
exports.auth = auth;
const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            res.status(403);
            throw new Error("Admin access required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireAdmin = requireAdmin;
