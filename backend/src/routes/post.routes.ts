import { Router } from "express";
import { createPost } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, createPost);

export default router;
