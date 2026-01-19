"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createPost = async (req, res) => {
    const { url, platform, description } = req.body;
    if (!url || !platform) {
        return res.status(400).json({ message: "Missing fields" });
    }
    const user = await prisma_1.default.user.findUnique({
        where: { id: req.userId },
    });
    if (!user || user.points < 5) {
        return res.status(403).json({ message: "Not enough points to post" });
    }
    const post = await prisma_1.default.post.create({
        data: {
            url,
            platform,
            description,
            authorId: user.id,
        },
    });
    res.json({
        success: true,
        postId: post.id,
    });
};
exports.createPost = createPost;
