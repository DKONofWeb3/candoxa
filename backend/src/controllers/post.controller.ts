import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/auth";

export const createPost = async (req: AuthRequest, res: Response) => {
  const { url, platform, description } = req.body;

  if (!url || !platform) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 🔓 Relax restriction in non-production environments
  const MIN_POINTS_TO_POST =
    process.env.NODE_ENV === "production" ? 5 : 0;

  if (user.points < MIN_POINTS_TO_POST) {
    return res
      .status(403)
      .json({ message: "Not enough points to post" });
  }

  const post = await prisma.post.create({
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
