import prisma from "../../db/prisma.js"

export async function findPublishedCategory(communitySlug: string, categorySlug: string) {
  return prisma.category.findFirst({
    where: { slug: categorySlug, community: { slug: communitySlug } },
    include: {
      articles: {
        where: { article: { status: "PUBLISHED" } },
        include: {
          article: { include: { publishedRevision: true } },
        },
      },
    },
  });
}