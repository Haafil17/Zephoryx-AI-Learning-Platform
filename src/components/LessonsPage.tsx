
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Star, Trophy, Clock, Target, Brain, Zap, Code, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  xp_reward: number;
  difficulty: string;
  category: string;
  created_at: string;
}

interface UserProgress {
  lesson_id: string;
  completed_at: string;
  xp_earned: number;
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

export const LessonsPage = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingLesson, setCompletingLesson] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchLessons();
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

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

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const completeLesson = async (lesson: Lesson) => {
    if (!user) {
      toast.error('Please sign in to complete lessons');
      return;
    }

    setCompletingLesson(lesson.id);
    try {
      const { error } = await supabase
        .from('user_lesson_progress')
        .insert({
          user_id: user.id,
          lesson_id: lesson.id,
          xp_earned: lesson.xp_reward
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('You have already completed this lesson!');
        } else {
          throw error;
        }
      } else {
        toast.success(`Lesson completed! You earned ${lesson.xp_reward} XP!`);
        fetchUserProgress();
        setSelectedLesson(null);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to complete lesson');
    } finally {
      setCompletingLesson(null);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.some(progress => progress.lesson_id === lessonId);
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

  const totalXP = userProgress.reduce((sum, progress) => sum + progress.xp_earned, 0);
  const completedLessons = userProgress.length;
  const totalLessons = lessons.length;
  const completionRate = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

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
          Master AI concepts through interactive lessons and earn XP
        </p>
      </div>

      {/* Progress Overview */}
      {user && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalXP}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total XP Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedLessons}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{completedLessons}/{totalLessons} lessons</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter - Made Bigger and More Visible */}
      <div className="flex flex-wrap gap-4 justify-center px-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-3 px-6 py-4 text-lg font-semibold rounded-xl 
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-0' 
                  : 'bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                }
              `}
            >
              <IconComponent className="w-6 h-6" />
              <span className="whitespace-nowrap">{category.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredLessons().map((lesson) => {
          const IconComponent = categoryIcons[lesson.category as keyof typeof categoryIcons] || Sparkles;
          const isCompleted = isLessonCompleted(lesson.id);
          
          return (
            <Card key={lesson.id} className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-500/50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${categoryColors[lesson.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {isCompleted && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-500">
                      <Star className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription className="mt-2">{lesson.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={difficultyColors[lesson.difficulty as keyof typeof difficultyColors]}>
                    {lesson.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <Trophy className="w-4 h-4" />
                    {lesson.xp_reward} XP
                  </div>
                </div>
                <Button 
                  onClick={() => setSelectedLesson(lesson)}
                  className="w-full"
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed' : 'Start Lesson'}
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
                  <div className="flex items-center gap-2">
                    <Badge className={difficultyColors[selectedLesson.difficulty as keyof typeof difficultyColors]}>
                      {selectedLesson.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-amber-600">
                      <Trophy className="w-4 h-4" />
                      {selectedLesson.xp_reward} XP
                    </div>
                  </div>
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
              
              {user ? (
                <div className="flex justify-end">
                  <Button
                    onClick={() => completeLesson(selectedLesson)}
                    disabled={completingLesson === selectedLesson.id || isLessonCompleted(selectedLesson.id)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    {completingLesson === selectedLesson.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Completing...
                      </>
                    ) : isLessonCompleted(selectedLesson.id) ? (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Already Completed
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Complete Lesson (+{selectedLesson.xp_reward} XP)
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    Sign in to complete lessons and earn XP!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
