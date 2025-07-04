
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  username: string;
  setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsernameState] = useState<string>('');

  useEffect(() => {
    // Load username from localStorage
    const savedUsername = localStorage.getItem('clavis-username');
    if (savedUsername) {
      setUsernameState(savedUsername);
    }
  }, []);

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    localStorage.setItem('clavis-username', newUsername);
  };

  const value = {
    username,
    setUsername
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
