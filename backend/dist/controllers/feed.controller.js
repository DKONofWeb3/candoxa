"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getFeed = async (_req, res) => {
    const posts = await prisma_1.default.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: { select: { username: true } },
        },
    });
    res.json(posts.map((post) => ({
        id: post.id,
        platform: post.platform,
        title: post.url,
        description: post.description,
        created_at: post.createdAt,
    })));
};
exports.getFeed = getFeed;
