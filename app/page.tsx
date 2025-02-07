export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to DevMate</h1>
      <p className="text-muted-foreground">
        Create and manage your development rules files with ease. Get started by creating a new rule or viewing existing ones.
      </p>
      <div className="flex gap-4">
        <a 
          href="/rules/new" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
        >
          Create New Rule
        </a>
        <a 
          href="/rules" 
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View Rules
        </a>
      </div>
    </div>
  );
}