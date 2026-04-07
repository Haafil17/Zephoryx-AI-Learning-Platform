
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TopicCompleteButtonProps {
  category: string;
  topicTitle: string;
}

export const TopicCompleteButton: React.FC<TopicCompleteButtonProps> = ({ category, topicTitle }) => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [showXpAnim, setShowXpAnim] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkCompletion = async () => {
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('category', category)
        .limit(1);
      
      if (lessons && lessons.length > 0) {
        const { data: progress } = await supabase
          .from('user_lesson_progress')
          .select('id')
          .eq('user_id', user.id)
          .eq('lesson_id', lessons[0].id)
          .limit(1);
        
        if (progress && progress.length > 0) {
          setCompleted(true);
        }
      }
    };
    checkCompletion();
  }, [user, category]);

  const handleComplete = async () => {
    if (!user || completed) return;
    setLoading(true);

    try {
      // Get lesson for this category
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, xp_reward')
        .eq('category', category)
        .limit(1);

      if (!lessons || lessons.length === 0) {
        toast.error("No lesson found for this topic");
        setLoading(false);
        return;
      }

      const lesson = lessons[0];

      // Check if already completed
      const { data: existing } = await supabase
        .from('user_lesson_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .limit(1);

      if (existing && existing.length > 0) {
        setCompleted(true);
        toast.info("Already completed!");
        setLoading(false);
        return;
      }

      // Record progress
      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .insert({
          user_id: user.id,
          lesson_id: lesson.id,
          xp_earned: lesson.xp_reward
        });

      if (progressError) throw progressError;

      // Update user XP
      const { data: profile } = await supabase
        .from('profiles')
        .select('xp, level')
        .eq('id', user.id)
        .single();

      const currentXp = profile?.xp || 0;
      const newXp = currentXp + lesson.xp_reward;
      
      // Calculate level
      let newLevel = 'AI Beginner';
      if (newXp >= 2000) newLevel = 'AI Master';
      else if (newXp >= 1500) newLevel = 'AI Expert';
      else if (newXp >= 1000) newLevel = 'AI Advanced';
      else if (newXp >= 500) newLevel = 'AI Intermediate';
      else if (newXp >= 200) newLevel = 'AI Learner';

      await supabase
        .from('profiles')
        .update({ xp: newXp, level: newLevel })
        .eq('id', user.id);

      setCompleted(true);
      setXpEarned(lesson.xp_reward);
      setShowXpAnim(true);
      toast.success(`+${lesson.xp_reward} XP earned! 🎉`);
      
      setTimeout(() => setShowXpAnim(false), 2000);
    } catch (err) {
      console.error('Error completing topic:', err);
      toast.error("Failed to record progress");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative flex justify-center mt-8 mb-4">
      <AnimatePresence>
        {showXpAnim && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -40 }}
            exit={{ opacity: 0 }}
            className="absolute -top-2 text-xl font-bold text-amber-500"
          >
            +{xpEarned} XP ✨
          </motion.div>
        )}
      </AnimatePresence>
      
      {completed ? (
        <Button disabled variant="outline" className="gap-2 border-green-500/50 text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          Completed
        </Button>
      ) : (
        <Button onClick={handleComplete} disabled={loading} className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Saving...' : 'Mark Complete & Earn XP'}
        </Button>
      )}
    </div>
  );
};
