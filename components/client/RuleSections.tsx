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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RuleSectionsProps {
  sections: RuleSection[];
  onChange: (sections: RuleSection[]) => void;
}

interface SortableItemProps {
  id: string;
  section: RuleSection;
  onUpdate: (id: string, updates: Partial<RuleSection>) => void;
  onRemove: (id: string) => void;
}

function SortableItem({ section, onUpdate, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="space-y-2 p-4 border rounded-lg bg-background hover:border-primary/50 transition-colors group"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-1 hover:bg-secondary/10 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
          <input
            type="text"
            value={section.title}
            onChange={(e) => onUpdate(section.id, { title: e.target.value })}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none flex-1 hover:bg-secondary/10 rounded px-2 py-1 transition-colors"
            placeholder="Section title..."
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(section.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
        >
          Remove
        </Button>
      </div>
      <textarea
        value={section.content}
        onChange={(e) => onUpdate(section.id, { content: e.target.value })}
        className="w-full min-h-[100px] p-2 font-mono text-sm bg-background resize-none rounded-lg border focus:border-primary"
        placeholder="Enter section content..."
      />
    </div>
  );
}

export function RuleSections({ sections, onChange }: RuleSectionsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over?.id);

      const reorderedSections = arrayMove(sections, oldIndex, newIndex).map(
        (section, index) => ({ ...section, order: index })
      );

      onChange(reorderedSections);
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {sections.map((section) => (
              <SortableItem
                key={section.id}
                id={section.id}
                section={section}
                onUpdate={handleUpdateSection}
                onRemove={handleRemoveSection}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
