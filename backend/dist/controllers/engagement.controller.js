"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.engage = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const engage = async (req, res) => {
    const { postId, type } = req.body;
    if (!postId || !type) {
        return res.status(400).json({ message: "Missing fields" });
    }
    const post = await prisma_1.default.post.findUnique({
        where: { id: postId },
    });
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    await prisma_1.default.engagement.create({
        data: {
            type,
            postId,
            userId: req.userId,
        },
    });
    let engagerPoints = 0;
    let authorPoints = 0;
    if (type === "click") {
        engagerPoints = 5;
        authorPoints = 2;
    }
    else if (type === "like" || type === "save") {
        engagerPoints = 1;
        authorPoints = 2;
    }
    await prisma_1.default.user.update({
        where: { id: req.userId },
        data: { points: { increment: engagerPoints } },
    });
    await prisma_1.default.user.update({
        where: { id: post.authorId },
        data: { points: { increment: authorPoints } },
    });
    res.json({
        success: true,
        type,
        points_awarded: engagerPoints,
    });
};
exports.engage = engage;
