import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/", authMiddleware, createPost);
export default router;
