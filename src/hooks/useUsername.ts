
import { useState, useEffect } from 'react';

export const useUsername = () => {
  const [username, setUsername] = useState<string>(() => {
    // Load username from localStorage on initialization
    return localStorage.getItem('clavis-username') || '';
  });

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('clavis-username', username);
    } else {
      localStorage.removeItem('clavis-username');
    }
  }, [username]);

  const clearUsername = () => {
    setUsername('');
    localStorage.removeItem('clavis-username');
  };

  return {
    username,
    setUsername,
    clearUsername
  };
};
