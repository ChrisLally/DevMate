'use client';

import { RuleSection, RULE_SECTION_TEMPLATES } from '@/types/rules';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface RuleSectionsProps {
  sections: RuleSection[];
  onChange: (sections: RuleSection[]) => void;
}

export function RuleSections({ sections, onChange }: RuleSectionsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>();

  const generateId = () => `section_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const handleAddSection = () => {
    if (!selectedTemplate) return;

    const newSection: RuleSection = {
      id: generateId(),
      title: selectedTemplate,
      content: '',
      order: sections.length,
    };

    onChange([...sections, newSection]);
    setSelectedTemplate(undefined);
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<RuleSection>) => {
    onChange(
      sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const handleRemoveSection = (sectionId: string) => {
    onChange(sections.filter((section) => section.id !== sectionId));
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="space-y-2 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                handleUpdateSection(section.id, { title: e.target.value })
              }
              className="text-lg font-semibold bg-transparent border-none focus:outline-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveSection(section.id)}
            >
              Remove
            </Button>
          </div>
          <textarea
            value={section.content}
            onChange={(e) =>
              handleUpdateSection(section.id, { content: e.target.value })
            }
            className="w-full min-h-[100px] p-2 font-mono text-sm bg-background resize-none rounded-lg border"
            placeholder="Enter section content..."
          />
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select section type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(RULE_SECTION_TEMPLATES).map(([key, value]) => (
              <SelectItem key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddSection} disabled={!selectedTemplate}>
          Add Section
        </Button>
      </div>
    </div>
  );
}
