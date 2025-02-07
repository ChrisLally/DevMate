// Rule: TypeScript interfaces for public APIs
export interface RuleSection {
  id: string;
  title: string;
  content: string;
}

// Rule: const objects with 'as const' instead of enums
export const TECH_STACKS = {
  NEXTJS: 'Next.js',
  REACT: 'React',
  NODE: 'Node.js',
  TYPESCRIPT: 'TypeScript',
} as const;

export type TechStack = typeof TECH_STACKS[keyof typeof TECH_STACKS];
