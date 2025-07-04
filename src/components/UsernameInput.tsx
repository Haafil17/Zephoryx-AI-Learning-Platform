
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const UsernameInput = () => {
  const { username, setUsername } = useAuth();
  const [tempUsername, setTempUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(!username);

  const handleSave = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  if (!isEditing && username) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Welcome back</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{username}</p>
              </div>
            </div>
            <Button onClick={handleEdit} variant="outline" size="sm">
              Change Name
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <User className="w-5 h-5" />
          {username ? 'Change Your Name' : 'What should we call you?'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Your Name</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className="text-center text-lg"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1" disabled={!tempUsername.trim()}>
            {username ? 'Update Name' : 'Save Name'}
          </Button>
          {username && (
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
