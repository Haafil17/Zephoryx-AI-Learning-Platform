
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Trophy, Target, Clock, Flame, TrendingUp, Brain, 
  BookOpen, Zap, BarChart3, Award
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface TopicMastery {
  topic: string;
  mastery: number;
  lessonsCompleted: number;
  totalLessons: number;
}

export const ProgressDashboard: React.FC = () => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState('AI Beginner');
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [streak, setStreak] = useState(0);
  const [topicMastery, setTopicMastery] = useState<TopicMastery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [profileRes, progressRes, lessonsRes] = await Promise.all([
          supabase.from('profiles').select('xp, level').eq('id', user.id).single(),
          supabase.from('user_lesson_progress').select('lesson_id, xp_earned, completed_at').eq('user_id', user.id),
          supabase.from('lessons').select('id, category, title')
        ]);

        if (profileRes.data) {
          setXp(profileRes.data.xp || 0);
          setLevel(profileRes.data.level || 'AI Beginner');
        }

        const completedIds = new Set((progressRes.data || []).map(p => p.lesson_id));
        setLessonsCompleted(completedIds.size);
        setTotalLessons((lessonsRes.data || []).length);

        // Calculate streak from completed_at dates
        const dates = (progressRes.data || [])
          .map(p => new Date(p.completed_at).toDateString())
          .filter((v, i, a) => a.indexOf(v) === i)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        
        let currentStreak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (dates[0] === today || dates[0] === yesterday) {
          currentStreak = 1;
          for (let i = 1; i < dates.length; i++) {
            const diff = new Date(dates[i - 1]).getTime() - new Date(dates[i]).getTime();
            if (diff <= 86400000 * 1.5) currentStreak++;
            else break;
          }
        }
        setStreak(currentStreak);

        // Topic mastery
        const categories = new Map<string, { completed: number; total: number }>();
        (lessonsRes.data || []).forEach(lesson => {
          const cat = lesson.category;
          if (!categories.has(cat)) categories.set(cat, { completed: 0, total: 0 });
          categories.get(cat)!.total++;
          if (completedIds.has(lesson.id)) categories.get(cat)!.completed++;
        });

        setTopicMastery(Array.from(categories.entries()).map(([topic, data]) => ({
          topic,
          mastery: data.total > 0 ? (data.completed / data.total) * 100 : 0,
          lessonsCompleted: data.completed,
          totalLessons: data.total
        })).sort((a, b) => b.mastery - a.mastery));

      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const nextLevelXp = xp < 200 ? 200 : xp < 500 ? 500 : xp < 1000 ? 1000 : xp < 1500 ? 1500 : 2000;
  const levelProgress = (xp / nextLevelXp) * 100;

  const stats = [
    { icon: Zap, label: "Total XP", value: xp.toLocaleString(), color: "text-amber-500" },
    { icon: BookOpen, label: "Lessons Done", value: `${lessonsCompleted}/${totalLessons}`, color: "text-blue-500" },
    { icon: Flame, label: "Day Streak", value: streak.toString(), color: "text-orange-500" },
    { icon: Award, label: "Level", value: level, color: "text-purple-500" },
  ];

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">Loading your progress...</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📊 Your Learning Dashboard
          </h2>
          <p className="text-muted-foreground">Track your AI learning journey in real-time</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/80 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Level Progress */}
        <Card className="mb-8 bg-card/80 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-foreground">{level}</span>
              </div>
              <span className="text-sm text-muted-foreground">{xp}/{nextLevelXp} XP to next level</span>
            </div>
            <Progress value={Math.min(levelProgress, 100)} className="h-4" />
          </CardContent>
        </Card>

        {/* Topic Mastery Grid */}
        {topicMastery.length > 0 && (
          <Card className="bg-card/80 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-primary" />
                Topic Mastery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topicMastery.map((topic) => (
                  <div key={topic.topic} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground capitalize">{topic.topic}</span>
                      <Badge variant={topic.mastery >= 80 ? "default" : topic.mastery >= 40 ? "secondary" : "outline"} className="text-xs">
                        {Math.round(topic.mastery)}%
                      </Badge>
                    </div>
                    <Progress value={topic.mastery} className="h-2" />
                    <p className="text-[10px] text-muted-foreground">{topic.lessonsCompleted}/{topic.totalLessons} lessons</p>
                  </div>
                ))}
              </div>
              {topicMastery.length === 0 && (
                <p className="text-center text-muted-foreground py-4">Complete lessons to see your mastery breakdown</p>
              )}
            </CardContent>
          </Card>
        )}

        {topicMastery.length === 0 && !loading && (
          <Card className="bg-card/80 border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-bold text-foreground mb-2">Start Your Journey!</h3>
              <p className="text-muted-foreground">Complete lessons to see your progress analytics here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
