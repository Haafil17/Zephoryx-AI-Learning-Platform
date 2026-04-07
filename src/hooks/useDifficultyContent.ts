import { useDifficulty, DifficultyLevel } from "@/contexts/DifficultyContext";

interface DifficultyContent {
  title: string;
  description: string;
  keyPoints: string[];
}

type ContentByDifficulty = {
  beginner: DifficultyContent;
  intermediate: DifficultyContent;
  advanced: DifficultyContent;
};

export const useDifficultyContent = () => {
  const { difficulty } = useDifficulty();

  const getContent = (content: ContentByDifficulty): DifficultyContent => {
    return content[difficulty];
  };

  const getDescription = (
    beginner: string,
    intermediate: string,
    advanced: string
  ): string => {
    if (difficulty === 'beginner') return beginner;
    if (difficulty === 'advanced') return advanced;
    return intermediate;
  };

  const getLabel = () => {
    if (difficulty === 'beginner') return '🌱 Beginner Friendly';
    if (difficulty === 'advanced') return '🔬 Expert Level';
    return '📚 Standard';
  };

  return { difficulty, getContent, getDescription, getLabel };
};
