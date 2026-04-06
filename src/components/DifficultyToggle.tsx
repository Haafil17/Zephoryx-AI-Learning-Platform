
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, BookOpen, GraduationCap } from "lucide-react";
import { useDifficulty, DifficultyLevel } from "@/contexts/DifficultyContext";

const levels: { value: DifficultyLevel; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'beginner', label: 'ELI5', icon: Baby, description: 'Simple analogies' },
  { value: 'intermediate', label: 'Standard', icon: BookOpen, description: 'Real examples' },
  { value: 'advanced', label: 'Expert', icon: GraduationCap, description: 'Technical depth' },
];

export const DifficultyToggle: React.FC = () => {
  const { difficulty, setDifficulty } = useDifficulty();

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border border-border/50">
      {levels.map(level => (
        <Button
          key={level.value}
          variant={difficulty === level.value ? "default" : "ghost"}
          size="sm"
          onClick={() => setDifficulty(level.value)}
          className={`gap-1.5 rounded-full text-xs h-8 px-3 transition-all ${
            difficulty === level.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title={level.description}
        >
          <level.icon className="w-3.5 h-3.5" />
          {level.label}
        </Button>
      ))}
    </div>
  );
};
