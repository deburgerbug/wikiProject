import { findPublishedCategory } from "./category.repository";

export async function getPublishedCategory(
  communitySlug: string,
  categorySlug: string,
) {
  const category = await findPublishedCategory(
    communitySlug,
    categorySlug,
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return {
    name: category.name,
    slug: category.slug,
    description: category.description,
    articles: category.articles.map(({ article }) => ({
      id: article.id,
      title: article.publishedRevision?.title ?? article.title,
      slug: article.slug,
      type: article.type,
      summary: article.publishedRevision?.summary ?? null,
    })),
  };
}