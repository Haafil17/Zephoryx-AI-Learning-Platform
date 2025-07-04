
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Brain, Zap, Code, Sparkles, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: string;
  category: string;
  created_at: string;
}

const categoryIcons = {
  'prompt-engineering': Brain,
  'ai-ethics': Target,
  'machine-learning': Zap,
  'neural-networks': Code,
  'general': Sparkles
};

const categoryColors = {
  'prompt-engineering': 'bg-blue-500',
  'ai-ethics': 'bg-green-500',
  'machine-learning': 'bg-purple-500',
  'neural-networks': 'bg-orange-500',
  'general': 'bg-gray-500'
};

const difficultyColors = {
  'beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export const SimpleLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredLessons = () => {
    if (selectedCategory === 'all') return lessons;
    return lessons.filter(lesson => lesson.category === selectedCategory);
  };

  const categories = [
    { id: 'all', name: 'All Lessons', icon: BookOpen },
    { id: 'prompt-engineering', name: 'Prompt Engineering', icon: Brain },
    { id: 'ai-ethics', name: 'AI Ethics', icon: Target },
    { id: 'machine-learning', name: 'Machine Learning', icon: Zap },
    { id: 'neural-networks', name: 'Neural Networks', icon: Code }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Learning Lessons
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Master AI concepts through interactive lessons
        </p>
      </div>

      {/* Category Filter - Big and Visible */}
      <div className="flex flex-wrap gap-4 justify-center px-4 py-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-3 px-8 py-6 text-xl font-bold rounded-2xl 
                transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[200px]
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl border-0 transform scale-105' 
                  : 'bg-white/90 dark:bg-slate-800/90 border-3 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 text-slate-800 dark:text-slate-200'
                }
              `}
            >
              <IconComponent className="w-8 h-8" />
              <span className="whitespace-nowrap">{category.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredLessons().map((lesson) => {
          const IconComponent = categoryIcons[lesson.category as keyof typeof categoryIcons] || Sparkles;
          
          return (
            <Card key={lesson.id} className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${categoryColors[lesson.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription className="mt-2">{lesson.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge className={difficultyColors[lesson.difficulty as keyof typeof difficultyColors]}>
                  {lesson.difficulty}
                </Badge>
                <Button 
                  onClick={() => setSelectedLesson(lesson)}
                  className="w-full"
                >
                  Start Lesson
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                  <Badge className={difficultyColors[selectedLesson.difficulty as keyof typeof difficultyColors]}>
                    {selectedLesson.difficulty}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedLesson(null)}
                  className="shrink-0"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedLesson.content}
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => setSelectedLesson(null)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Lesson Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
