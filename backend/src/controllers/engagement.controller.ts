import { Response } from "express";
import prisma from "../utils/prisma";
import { AuthRequest } from "../middleware/auth";

export const engage = async (req: AuthRequest, res: Response) => {
  const { postId, type } = req.body;

  if (!postId || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) return res.status(404).json({ message: "Post not found" });

  await prisma.engagement.create({
    data: {
      type,
      postId,
      userId: req.userId!,
    },
  });

  let engagerPoints = 0;
  let authorPoints = 0;

  if (type === "click") {
    engagerPoints = 5;
    authorPoints = 2;
  } else if (type === "like" || type === "save") {
    engagerPoints = 1;
    authorPoints = 2;
  }

  await prisma.user.update({
    where: { id: req.userId },
    data: { points: { increment: engagerPoints } },
  });

  await prisma.user.update({
    where: { id: post.authorId },
    data: { points: { increment: authorPoints } },
  });

 res.json({
  success: true,
  type,
  points_awarded: engagerPoints,
});

};
