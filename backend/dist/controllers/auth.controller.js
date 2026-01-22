"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const COOKIE_NAME = "token";
const cookieOptions = {
    httpOnly: true,
    secure: true, // REQUIRED on Vercel
    sameSite: "none",
    path: "/",
};
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }
    const existing = await prisma_1.default.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });
    if (existing) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: { username, email, password: hashed },
    });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.json({ success: true });
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.json({ success: true });
};
exports.login = login;
const logout = async (_req, res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.json({ success: true });
};
exports.logout = logout;
