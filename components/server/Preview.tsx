// Rule: Default to React Server Components (no 'use client')
interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  return (
    <div className="prose prose-sm h-full overflow-auto p-4">
      {content || 'Preview will appear here...'}
    </div>
  );
}
