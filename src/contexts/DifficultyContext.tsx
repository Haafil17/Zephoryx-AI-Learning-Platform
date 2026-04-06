
import React, { createContext, useContext, useState } from 'react';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

interface DifficultyContextType {
  difficulty: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
}

const DifficultyContext = createContext<DifficultyContextType | undefined>(undefined);

export const DifficultyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => {
    return (localStorage.getItem('zephoryx-difficulty') as DifficultyLevel) || 'intermediate';
  });

  const handleSetDifficulty = (level: DifficultyLevel) => {
    setDifficulty(level);
    localStorage.setItem('zephoryx-difficulty', level);
  };

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty: handleSetDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficulty = () => {
  const context = useContext(DifficultyContext);
  if (!context) throw new Error('useDifficulty must be used within DifficultyProvider');
  return context;
};
