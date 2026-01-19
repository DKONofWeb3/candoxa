import prisma from "../utils/prisma.js";
export const createPost = async (req, res) => {
    const { url, platform, description } = req.body;
    if (!url || !platform) {
        return res.status(400).json({ message: "Missing fields" });
    }
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
    });
    if (!user || user.points < 5) {
        return res.status(403).json({ message: "Not enough points to post" });
    }
    const post = await prisma.post.create({
        data: {
            url,
            platform,
            description,
            authorId: user.id,
        },
    });
    res.json({
        success: true,
        postId: post.id,
    });
};
