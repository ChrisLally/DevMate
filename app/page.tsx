'use client';

import { Editor } from '@/components/client/Editor';
import { Preview } from '@/components/client/Preview';
import { RuleSection, TechStack } from '@/types/rules';
import { useState } from 'react';

export default function Home() {
  const [sections, setSections] = useState<RuleSection[]>([]);
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null);

  const content = sections
    .sort((a, b) => a.order - b.order)
    .map(section => `## ${section.title}\n\n${section.content}`)
    .join('\n\n---\n\n');

  return (
    <main className="min-h-screen p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100vh-2rem)]">
        <div className="border rounded-lg overflow-hidden">
          <Editor 
            sections={sections}
            selectedStack={selectedStack}
            onUpdateSections={setSections}
            onSelectStack={setSelectedStack}
          />
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Preview content={content} />
        </div>
      </div>
    </main>
  );
}
