import { getTechStacks } from '@/actions/tech-stacks/get-tech-stacks'
import { getUserRules } from '@/actions/rules/get-user-rules'
import { TechStackFilter } from '@/components/client/TechStackFilter'
import { formatRelativeTime } from '@/utils/date'
import Link from 'next/link'

export default async function RulesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Wait for searchParams to be ready and extract search parameter safely
  const params = await searchParams
  const searchQuery = typeof params.search === 'string' ? params.search : ''

  const [rules, techStacks] = await Promise.all([
    getUserRules(),
    getTechStacks(searchQuery)
  ])

  return (
    <div className="space-y-8">
      {/* User's Rules Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Rules</h1>
          <Link 
            href="/rules/new" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
          >
            Create New Rule
          </Link>
        </div>
        
        <div className="grid gap-4">
          {rules.map((rule) => (
            <Link
              key={rule.id}
              href={`/rules/${rule.id}`}
              className="block rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">{rule.name}</h3>
                  {rule.description && (
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatRelativeTime(rule.created_at)}
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {rule.tech_stack.name}
                </span>
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                  {rule.category}
                </span>
              </div>
            </Link>
          ))}
          
          {rules.length === 0 && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <p className="text-center text-muted-foreground">No rules created yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stacks Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Available Tech Stacks</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Search and select a tech stack to create a new rule
          </p>
        </div>
        
        <div className="space-y-4">
          <TechStackFilter />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techStacks.map((stack) => (
              <Link
                key={stack.id}
                href={`/rules/new?stack=${stack.id}`}
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-2 hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium">{stack.name}</h3>
                {stack.description && (
                  <p className="text-sm text-muted-foreground">{stack.description}</p>
                )}
              </Link>
            ))}
            
            {techStacks.length === 0 && (
              <div className="col-span-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-center text-muted-foreground">
                  {searchQuery 
                    ? 'No tech stacks found matching your search.'
                    : 'No tech stacks available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}