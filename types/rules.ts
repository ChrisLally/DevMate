// Rule: TypeScript interfaces for public APIs
export interface RuleSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

// Rule: const objects with 'as const' instead of enums
export const TECH_STACKS = {
  NEXTJS: 'Next.js',
  REACT: 'React',
  NODE: 'Node.js',
  TYPESCRIPT: 'TypeScript',
} as const;

export type TechStack = typeof TECH_STACKS[keyof typeof TECH_STACKS];

export const RULE_SECTION_TEMPLATES = {
  CODE_STYLE: 'Code Style',
  PROJECT_STRUCTURE: 'Project Structure',
  TESTING: 'Testing',
  DEPLOYMENT: 'Deployment',
  DOCUMENTATION: 'Documentation',
  PERFORMANCE: 'Performance',
  ERROR_HANDLING: 'Error Handling',
  STATE_MANAGEMENT: 'State Management',
  SECURITY: 'Security',
  CUSTOM: 'Custom Section',
} as const;

export type RuleSectionTemplate = typeof RULE_SECTION_TEMPLATES[keyof typeof RULE_SECTION_TEMPLATES];
