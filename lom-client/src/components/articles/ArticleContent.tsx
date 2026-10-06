import ReactMarkdown from "react-markdown"

interface ArticleContentProps {
    content: string
}

function createId(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
export default function ArticleContent({
  content,
}: ArticleContentProps) {
  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown
        components={{ h2: ({ children }) => {
            const title = String(children);

            return (
              <h2 id={createId(title)}>
                {children}
              </h2>
            );
          },

          h3: ({ children }) => {
            const title = String(children);

            return (
              <h3 id={createId(title)}>
                {children}
              </h3>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}