"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const post_routes_js_1 = __importDefault(require("./routes/post.routes.js"));
const feed_routes_js_1 = __importDefault(require("./routes/feed.routes.js"));
const engagement_routes_js_1 = __importDefault(require("./routes/engagement.routes.js"));
const leaderboard_routes_js_1 = __importDefault(require("./routes/leaderboard.routes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://candoxa.vercel.app"
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/auth", auth_routes_js_1.default);
app.use("/users", user_routes_js_1.default);
app.use("/posts", post_routes_js_1.default);
app.use("/feed", feed_routes_js_1.default);
app.use("/engagements", engagement_routes_js_1.default);
app.use("/leaderboard", leaderboard_routes_js_1.default);
app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
exports.default = app;
