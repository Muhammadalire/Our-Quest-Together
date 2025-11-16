
import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';

const useUserProgress = (userName: string | null) => {
  const getInitialState = (): UserProgress | null => {
    if (!userName) return null;
    try {
      const item = window.localStorage.getItem(`userProgress_${userName}`);
      if (item) {
        return JSON.parse(item);
      }
      return {
        name: userName,
        completedTasks: [],
        unlockedRewards: [],
        dailyProgress: {},
        streak: 0,
        lastCompletedDate: null,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const [progress, setProgress] = useState<UserProgress | null>(getInitialState());

  useEffect(() => {
    if (userName) {
      setProgress(getInitialState());
    } else {
      setProgress(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const saveProgress = useCallback((newProgress: UserProgress) => {
    try {
      if(newProgress.name) {
        window.localStorage.setItem(`userProgress_${newProgress.name}`, JSON.stringify(newProgress));
        setProgress(newProgress);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [progress, saveProgress] as const;
};

export default useUserProgress;
   