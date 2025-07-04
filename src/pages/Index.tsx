
import React from 'react';
import { Hero } from '@/components/Hero';
import { UsernameInput } from '@/components/UsernameInput';
import { SimpleLessons } from '@/components/SimpleLessons';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Clavis AI
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Hero />
          <div className="max-w-md mx-auto">
            <UsernameInput />
          </div>
          <SimpleLessons />
        </div>
      </div>
    </div>
  );
};

export default Index;
