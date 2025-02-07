import { getRule } from '@/actions/rules/get-rule'
import { formatRelativeTime } from '@/utils/date'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function RuleDetailPage({
  params,
}: {
  params: { rule_id: string }
}) {
  const rule = await getRule(params.rule_id)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/rules"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Rules
        </Link>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{rule.name}</h1>
          {rule.description && (
            <p className="text-lg text-muted-foreground">{rule.description}</p>
          )}
        </div>

        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {rule.tech_stack.name} {rule.tech_stack.version}
          </span>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
            {rule.category}
          </span>
          {rule.tags?.map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Created {formatRelativeTime(rule.created_at)}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {rule.rule_content}
        </div>
      </div>

      {rule.parameters && Object.keys(rule.parameters).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Parameters</h2>
          <div className="rounded-lg border bg-card p-6">
            <pre className="text-sm">
              {JSON.stringify(rule.parameters, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
