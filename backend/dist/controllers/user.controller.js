"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyActivity = exports.getMe = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getMe = async (req, res) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: req.userId },
        include: {
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({
        id: user.id,
        username: user.username,
        display_name: user.username,
        points: user.points,
        joined_at: user.createdAt,
        discoveries: user._count.posts,
        saved: 0, // placeholder
        avatar_url: null, // future-proof
    });
};
exports.getMe = getMe;
const getMyActivity = async (req, res) => {
    const userId = req.userId;
    const engagements = await prisma_1.default.engagement.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
            post: {
                select: {
                    description: true,
                    url: true,
                },
            },
        },
    });
    const activity = engagements.map((e) => ({
        type: e.type, // click | like | save
        description: e.post.description || e.post.url,
        created_at: e.createdAt,
    }));
    res.json(activity);
};
exports.getMyActivity = getMyActivity;
