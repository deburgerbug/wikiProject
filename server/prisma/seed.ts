import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const community = await prisma.community.upsert({
    where: {
      slug: "lord-of-mysteries",
    },
    update: {},
    create: {
      name: "Lord of Mysteries",
      slug: "lord-of-mysteries",
      description: "A dedicated Lord of Mysteries lore and community platform.",
    },
  });

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@lom.local",
    },
    update: {
      role: "ADMIN",
    },
    create: {
      email: "admin@lom.local",
      username: "admin",
      role: "ADMIN",
    },
  });

  const article = await prisma.article.upsert({
    where: {
      communityId_slug: {
        communityId: community.id,
        slug: "klein-moretti",
      },
    },
    update: {},
    create: {
      communityId: community.id,
      type: "CHARACTER",
      title: "Klein Moretti",
      slug: "klein-moretti",
      status: "PUBLISHED",
      createdById: admin.id,
    },
  });

  const revision = await prisma.articleRevision.create({
    data: {
      articleId: article.id,
      revisionNumber: 1,
      title: "Klein Moretti",
      summary: "A central character in Lord of Mysteries.",
      bodyMarkdown: "# Klein Moretti\n\nInitial article content.",
      infoboxData: {
        aliases: [],
      },
      createdById: admin.id,
      changeSummary: "Initial article",
    },
  });

  await prisma.article.update({
    where: { id: article.id },
    data: {
      publishedRevisionId: revision.id,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });