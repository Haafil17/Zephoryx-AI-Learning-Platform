
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Edit2, Check, X, Sparkles } from 'lucide-react';
import { useUsername } from '@/hooks/useUsername';
import { toast } from 'sonner';

export const UsernameSection = () => {
  const { username, setUsername, clearUsername } = useUsername();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleEditUsername = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setIsEditing(false);
      toast.success('Username saved successfully!');
    } else {
      toast.error('Please enter a valid username');
    }
  };

  const handleCancelEdit = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  const handleClearUsername = () => {
    clearUsername();
    setIsEditing(false);
    setTempUsername('');
    toast.success('Username cleared!');
  };

  return (
    <Card className="relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl border-2 border-indigo-200/50 dark:border-indigo-500/30 shadow-2xl shadow-indigo-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
      
      <CardHeader className="text-center pb-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse drop-shadow-lg" />
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to AIONYX
          </CardTitle>
        </div>

        {/* Username Section */}
        <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-slate-700/80 dark:to-slate-600/80 rounded-xl border border-indigo-200/50 dark:border-slate-500/50">
          {!isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Welcome back,</div>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {username || 'Set your username'}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditUsername}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-700"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Enter your username"
                className="bg-white dark:bg-slate-700 border-indigo-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-indigo-500 dark:focus:border-indigo-400"
                autoFocus
              />
              <div className="flex gap-2 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveUsername}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X className="w-4 h-4" />
                </Button>
                {username && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearUsername}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Ready to master AI prompt engineering? Explore our comprehensive tools and techniques!
        </p>
        <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <span>🎯</span>
            <span>Advanced Techniques</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>💡</span>
            <span>Practical Examples</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🤖</span>
            <span>AI Chat Assistant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
