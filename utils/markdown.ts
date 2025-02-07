// Rule: Explicit return types for all functions
export function formatMarkdown(content: string): string {
  return content.trim();
}

// Rule: Descriptive variable names with auxiliary verbs
export function isValidMarkdown(content: string): boolean {
  return content.length > 0;
}
