interface ArticleHeaderProps {
    title: string;
    summary: string;
    type: string
}

export default function ArticleHeader({title, summary, type}: ArticleHeaderProps) {
    return (
        <header className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500 ">
                {type}
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-500 ">
                {title}
            </h1>

            {summary && (
                <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                    {summary}
                </p>
            )}
        </header>
    )
}