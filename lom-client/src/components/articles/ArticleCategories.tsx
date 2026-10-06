interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ArticleCategoriesProps {
  categories: Category[];
}

export default function ArticleCategories({
  categories,
}: ArticleCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-6">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Categories
      </h2>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category.id}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {category.name}
          </span>
        ))}
      </div>
    </section>
  );
}