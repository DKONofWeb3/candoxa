import { Router } from "express";
import { engage } from "../controllers/engagement.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, engage);

export default router;
