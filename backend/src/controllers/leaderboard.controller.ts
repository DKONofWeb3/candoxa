import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getLeaderboard = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 50,
    select: {
      id: true,
      username: true,
      points: true,
    },
  });

  res.json(
  users.map((u) => ({
    username: u.username,
    points: u.points,
  }))
);

};
