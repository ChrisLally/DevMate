'use client';

import { RuleSection, TechStack } from '@/types/rules';
import { TechStackSelector } from './TechStackSelector';
import { RuleSections } from './RuleSections';

// Rule: Use TypeScript interfaces
interface EditorProps {
  sections: RuleSection[];
  selectedStack: TechStack | null;
  onUpdateSections: (sections: RuleSection[]) => void;
  onSelectStack: (stack: TechStack) => void;
}

// Rule: Functional components with TypeScript
export function Editor({ sections, selectedStack, onUpdateSections, onSelectStack }: EditorProps) {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <TechStackSelector 
        selectedStack={selectedStack} 
        onSelect={onSelectStack}
      />
      <div className="flex-1 overflow-auto">
        <RuleSections 
          sections={sections} 
          onChange={onUpdateSections}
        />
      </div>
    </div>
  );
}
