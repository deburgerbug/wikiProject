import prisma from "../../db/prisma.js"

export async function findPublishedArticleBySlug(communitySlug: string, articleSlug: string){
    return prisma.article.findFirst({
        where: {
            slug: articleSlug,
            status: "PUBLISHED",
            community:{
                slug:communitySlug
            },
        },
        include:{
            publishedRevision: true,
            categories:{
                include:{
                    category: true
                },
            },
        },
    });
}