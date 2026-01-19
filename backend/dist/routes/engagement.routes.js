"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const engagement_controller_1 = require("../controllers/engagement.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authMiddleware, engagement_controller_1.engage);
exports.default = router;
