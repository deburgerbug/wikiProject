interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  content: string;
}

function createId(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): TocItem[] {
  const lines = content.split("\n");
  const headings: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);

    if (!match) continue;

    const level = match[1].length;
    const title = match[2].trim();

    headings.push({
      id: createId(title),
      title,
      level,
    });
  }

  return headings;
}

export default function ArticleTableOfContents({
  content,
}: ArticleTableOfContentsProps) {
  const headings = extractHeadings(content);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
        Contents
      </h2>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}