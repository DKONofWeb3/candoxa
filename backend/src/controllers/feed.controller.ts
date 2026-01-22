import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/auth";

export const getFeed = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { username: true },
      },
      engagements: {
        where: {
          userId: req.userId,
          type: "like",
        },
        select: { id: true },
      },
      saves: {
        where: {
          userId: req.userId,
        },
        select: { id: true },
      },
    },
  });

  res.json(
    posts.map(post => ({
      id: post.id,
      platform: post.platform,
      description: post.description,
      url: post.url,
      created_at: post.createdAt,
      engagements: {
        liked: post.engagements.length > 0,
        saved: post.saves.length > 0,
      },
    }))
  );
};
