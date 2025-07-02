
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Trophy, Clock, Star, CheckCircle2, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
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
  completed?: boolean;
}

interface UserProgress {
  lesson_id: string;
  completed_at: string;
  xp_earned: number;
}

export const LessonsPage = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

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

    try {
      const { error } = await supabase
        .from('user_lesson_progress')
        .insert({
          user_id: user.id,
          lesson_id: lesson.id,
          xp_earned: lesson.xp_reward
        });

      if (error) throw error;

      toast.success(`Lesson completed! +${lesson.xp_reward} XP`);
      fetchUserProgress();
      setSelectedLesson(null);
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('You have already completed this lesson!');
      } else {
        toast.error('Failed to complete lesson');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prompt-engineering': return '🎯';
      case 'ai-ethics': return '⚖️';
      case 'machine-learning': return '🤖';
      default: return '📚';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const completedLessons = lessons.filter(lesson => 
    userProgress.some(progress => progress.lesson_id === lesson.id)
  );

  const totalXP = userProgress.reduce((sum, progress) => sum + progress.xp_earned, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Total XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalXP}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedLessons.length}</div>
            <p className="text-sm opacity-90">of {lessons.length} lessons</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0}%
            </div>
            <Progress 
              value={lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0} 
              className="mt-2 bg-white/20" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const isCompleted = userProgress.some(progress => progress.lesson_id === lesson.id);
          
          return (
            <Card 
              key={lesson.id} 
              className={`transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-950/20' : ''
              }`}
              onClick={() => setSelectedLesson(lesson)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-2xl">{getCategoryIcon(lesson.category)}</div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : user ? (
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`text-white ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    {lesson.xp_reward} XP
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={isCompleted ? "secondary" : "default"}
                  disabled={!user || isCompleted}
                >
                  {!user ? "Sign in to start" : isCompleted ? "Completed" : "Start Lesson"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{selectedLesson.title}</CardTitle>
                  <CardDescription className="text-base">{selectedLesson.description}</CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setSelectedLesson(null)}>
                  ✕
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Badge className={`text-white ${getDifficultyColor(selectedLesson.difficulty)}`}>
                  {selectedLesson.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <Trophy className="w-4 h-4" />
                  {selectedLesson.xp_reward} XP
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedLesson.content}</p>
              </div>
              
              {user && !userProgress.some(progress => progress.lesson_id === selectedLesson.id) && (
                <Button 
                  onClick={() => completeLesson(selectedLesson)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Complete Lesson & Earn {selectedLesson.xp_reward} XP
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
