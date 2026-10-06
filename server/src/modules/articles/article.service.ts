import prisma from "../../db/prisma";
import { findPublishedArticleBySlug } from "./article.repository";

export async function getPublishedArticle(communitySlug: string, articleSlug: string) {
    const article = await findPublishedArticleBySlug(communitySlug, articleSlug)

    if (!article) {
        throw new Error("Article not found")
    }
    return {
        id: article.id,
        title: article.publishedRevision!.title,
        slug: article.slug,
        type: article.type,
        summary: article.publishedRevision!.summary,
        content: article.publishedRevision!.bodyMarkdown,
        infobox: article.publishedRevision!.infoboxData,
        categories: article.categories.map(({ category }) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
        })),
    }
}
