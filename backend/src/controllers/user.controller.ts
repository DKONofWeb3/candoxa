import { Response } from "express";
import prisma from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: {
     _count: {
  select: {
    posts: true,
  },
},
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

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

export const getMyActivity = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const engagements = await prisma.engagement.findMany({
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
