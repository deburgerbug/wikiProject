import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryResponse {
  name: string;
  slug: string;
  description: string | null;
  articles: {
    id: string;
    title: string;
    slug: string;
    type: string;
    summary: string | null;
  }[];
}

interface PageProps {
  params: Promise<{
    communitySlug: string;
    categorySlug: string;
  }>;
}

async function getCategory(
  communitySlug: string,
  categorySlug: string,
): Promise<CategoryResponse | null> {
  const baseUrl = process.env.BACKEND_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_URL is not configured");
  }

  const response = await fetch(
    `${baseUrl}/api/communities/${communitySlug}/categories/${categorySlug}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const result = await response.json();

  return result.data;
}

export default async function CategoryPage({ params }: PageProps) {
  const { communitySlug, categorySlug } = await params;

  const category = await getCategory(communitySlug, categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link
            href={`/lord-of-mysteries`}
            className="hover:text-gray-900"
          >
            Lord of Mysteries
          </Link>

          <span className="mx-2">&gt;</span>

          <span>Categories</span>

          <span className="mx-2">&gt;</span>

          <span className="text-gray-900">{category.name}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              {category.description}
            </p>
          )}
        </header>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Articles
            </h2>

            <span className="text-sm text-gray-500">
              {category.articles.length}{" "}
              {category.articles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {category.articles.length === 0 ? (
            <p className="text-gray-500">
              No published articles in this category yet.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {category.articles.map((article) => (
                <article key={article.id} className="py-5 first:pt-0 last:pb-0">
                  <Link
                    href={`/${communitySlug}/${article.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:underline">
                          {article.title}
                        </h3>

                        {article.summary && (
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {article.summary}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
                        {article.type}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}