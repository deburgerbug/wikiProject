import { notFound } from "next/navigation";

import ArticleHeader from "../../../src/components/articles/ArticleHeader";
import ArticleInfobox from "../../../src/components/articles/ArticleInfobox";
import ArticleContent from "../../../src/components/articles/ArticleContent";
import ArticleTableOfContents from "../../../src//components/articles/ArticleTableOfContents";
import ArticleCategories from "../../../src/components/articles/ArticleCategories";

interface ArticleResponse {
  id: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  content: string;
  infobox: Record<string, unknown>;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface PageProps {
  params: Promise<{
    communitySlug: string;
    articleSlug: string;
  }>;
}

async function getArticle(
  communitySlug: string,
  articleSlug: string,
): Promise<ArticleResponse | null> {
  const baseUrl = process.env.BACKEND_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  const response = await fetch(
    `${baseUrl}/api/communities/${communitySlug}/articles/${articleSlug}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  const result = await response.json();

  return result.data;
}

export default async function ArticlePage({ params }: PageProps) {
  const { communitySlug, articleSlug } = await params;

  const article = await getArticle(communitySlug, articleSlug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-gray-500">
          Lord of Mysteries &gt; {article.type}
        </div>

        <ArticleHeader
          title={article.title}
          summary={article.summary} 
          type={article.type}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <ArticleInfobox
              title={article.title}
              data={article.infobox}
            />
          </aside>

          <section className="min-w-0 rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <ArticleTableOfContents content={article.content} />

            <ArticleContent content={article.content} />

            <ArticleCategories categories={article.categories} />
          </section>
        </div>
      </div>
    </main>
  );
}