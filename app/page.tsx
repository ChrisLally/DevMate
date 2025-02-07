'use client';

import { Editor } from '@/components/client/Editor';
import { Preview } from '@/components/server/Preview';
import { TechStack } from '@/types/rules';
import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null);

  return (
    <main className="min-h-screen p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
        <div className="border rounded-lg overflow-hidden">
          <Editor 
            content={content} 
            selectedStack={selectedStack}
            onChange={setContent}
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
