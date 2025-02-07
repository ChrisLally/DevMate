'use client';

import { TechStack } from '@/types/rules';
import { TechStackSelector } from './TechStackSelector';

// Rule: Use TypeScript interfaces
interface EditorProps {
  content: string;
  selectedStack: TechStack | null;
  onChange: (content: string) => void;
  onSelectStack: (stack: TechStack) => void;
}

// Rule: Functional components with TypeScript
export function Editor({ content, selectedStack, onChange, onSelectStack }: EditorProps) {
  // Rule: Prefix handlers with "handle"
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <TechStackSelector 
        selectedStack={selectedStack} 
        onSelect={onSelectStack}
      />
      <textarea
        className="flex-1 w-full p-4 font-mono text-sm bg-background resize-none rounded-lg border"
        value={content}
        onChange={handleTextChange}
        placeholder="Start typing your rules..."
      />
    </div>
  );
}
