"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getLeaderboard = async (_req, res) => {
    const users = await prisma_1.default.user.findMany({
        orderBy: { points: "desc" },
        take: 50,
        select: {
            id: true,
            username: true,
            points: true,
        },
    });
    res.json(users.map((u) => ({
        username: u.username,
        points: u.points,
    })));
};
exports.getLeaderboard = getLeaderboard;
