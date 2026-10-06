interface ArticleInfoboxProps {
  title: string;
  data: Record<string, unknown>;
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (value && typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function ArticleInfobox({
  title,
  data,
}: ArticleInfoboxProps) {
  const entries = Object.entries(data ?? {}).filter(
    ([, value]) => value !== null && value !== undefined && value !== "",
  );

  return (
    <aside className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>

      <dl className="divide-y divide-gray-100">
        {entries.length > 0 ? (
          entries.map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 gap-4 px-5 py-3">
              <dt className="text-sm font-medium text-gray-500">
                {formatLabel(key)}
              </dt>

              <dd className="text-sm text-gray-900">
                {formatValue(value)}
              </dd>
            </div>
          ))
        ) : (
          <p className="px-5 py-4 text-sm text-gray-500">
            No information available.
          </p>
        )}
      </dl>
    </aside>
  );
}