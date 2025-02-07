'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TECH_STACKS, TechStack } from "@/types/rules";

// Rule: TypeScript interfaces
interface TechStackSelectorProps {
  selectedStack: TechStack | null;
  onSelect: (stack: TechStack) => void;
}

// Rule: Functional components with TypeScript
export function TechStackSelector({ selectedStack, onSelect }: TechStackSelectorProps) {
  // Rule: Prefix handlers with "handle"
  const handleValueChange = (value: string) => {
    // Type assertion is safe here as we only render SelectItems with valid TechStack values
    onSelect(value as TechStack);
  };

  return (
    <Select value={selectedStack ?? undefined} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select tech stack" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TECH_STACKS).map(([key, value]) => (
          <SelectItem key={key} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
