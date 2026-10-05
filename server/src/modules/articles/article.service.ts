import prisma from "../../db/prisma";
import { findPublishedArticleBySlug } from "./article.repository";

export async function getPublishedArticle(communitySlug:string, articleSlug: string){
    const article = await findPublishedArticleBySlug(communitySlug, articleSlug)

    if(!article){
        throw new Error("Article not found")
    }
    return article
}