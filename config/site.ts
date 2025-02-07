// Rule: Use absolute imports
import { TECH_STACKS } from '@/types/rules';

// Rule: Use const with 'as const' for configuration
export const siteConfig = {
  name: 'DevMate',
  description: 'Create and manage your development rules files with ease.',
  defaultTechStacks: [
    TECH_STACKS.NEXTJS,
    TECH_STACKS.REACT,
    TECH_STACKS.NODE,
    TECH_STACKS.TYPESCRIPT,
  ],
} as const;
