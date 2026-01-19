import { Router } from "express";
import { getMe, getMyActivity } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.get("/me/activity", authMiddleware, getMyActivity);

export default router;
