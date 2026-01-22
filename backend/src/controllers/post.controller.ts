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

  /**
   * Feature flag:
   * - REQUIRE_POINTS_FOR_POSTS=true  → enforce points
   * - REQUIRE_POINTS_FOR_POSTS=false → allow posting freely
   */
  const REQUIRE_POINTS =
    process.env.REQUIRE_POINTS_FOR_POSTS === "true";

  if (REQUIRE_POINTS && user.points < 5) {
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
