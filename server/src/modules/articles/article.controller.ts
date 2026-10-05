import type { Request, Response } from "express";
import { getPublishedArticle } from "./article.service";

export async function getArticle(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { communitySlug, articleSlug } = req.params;

    const article = await getPublishedArticle(communitySlug as string, articleSlug as string);

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message: "Article not found",
    });
  }
}