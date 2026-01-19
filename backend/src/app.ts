import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import feedRoutes from "./routes/feed.routes";
import engagementRoutes from "./routes/engagement.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/feed", feedRoutes);
app.use("/engagements", engagementRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
