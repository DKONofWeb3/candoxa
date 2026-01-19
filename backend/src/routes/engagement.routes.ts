import { Router } from "express";
import { engage } from "../controllers/engagement.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, engage);

export default router;
