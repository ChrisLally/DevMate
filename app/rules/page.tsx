export default function RulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Rules</h1>
        <a 
          href="/rules/new" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
        >
          Create New Rule
        </a>
      </div>
      <p className="text-muted-foreground">
        View and manage your development rules files.
      </p>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-center text-muted-foreground">No rules created yet.</p>
      </div>
    </div>
  );
}