
import { useState, useEffect } from 'react';

export const useUsername = () => {
  const [username, setUsername] = useState<string>(() => {
    // Load username from localStorage on initialization
    return localStorage.getItem('aionyx-username') || '';
  });

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('aionyx-username', username);
    } else {
      localStorage.removeItem('aionyx-username');
    }
  }, [username]);

  const clearUsername = () => {
    setUsername('');
    localStorage.removeItem('aionyx-username');
  };

  return {
    username,
    setUsername,
    clearUsername
  };
};
