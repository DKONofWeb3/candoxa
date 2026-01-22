import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import feedRoutes from "./routes/feed.routes.js";
import engagementRoutes from "./routes/engagement.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";

const app = express();

/**
 * REQUIRED for Render / HTTPS cookies
 */
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://candoxa.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/feed", feedRoutes);
app.use("/engagements", engagementRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default app;
