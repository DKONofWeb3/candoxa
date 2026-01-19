import prisma from "../utils/prisma.js";
export const getFeed = async (_req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: { select: { username: true } },
        },
    });
    res.json(posts.map((post) => ({
        id: post.id,
        platform: post.platform,
        title: post.url,
        description: post.description,
        created_at: post.createdAt,
    })));
};
