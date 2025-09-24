import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserStats {
  waterDrops: number;
  completedLessons: number;
  currentStreak: number;
  totalTrees: number;
  plantGrowthLevel: number;
  rank: number;
}

interface UserContextType {
  stats: UserStats;
  addWaterDrops: (amount: number) => void;
  spendWaterDrops: (amount: number) => boolean;
  completeLesson: () => void;
  waterPlant: (amount: number) => boolean;
  plantTree: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    waterDrops: 0,
    completedLessons: 0,
    currentStreak: 0,
    totalTrees: 0,
    plantGrowthLevel: 0,
    rank: 1
  });

  useEffect(() => {
    if (isAuthenticated) {
      const savedStats = localStorage.getItem('codeburry_stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        // Initialize with some demo data
        const initialStats = {
          waterDrops: 15,
          completedLessons: 3,
          currentStreak: 2,
          totalTrees: 1,
          plantGrowthLevel: 25,
          rank: 12
        };
        setStats(initialStats);
        localStorage.setItem('codeburry_stats', JSON.stringify(initialStats));
      }
    }
  }, [isAuthenticated]);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    if (isAuthenticated) {
      localStorage.setItem('codeburry_stats', JSON.stringify(newStats));
    }
  };

  const addWaterDrops = (amount: number) => {
    saveStats({ ...stats, waterDrops: stats.waterDrops + amount });
  };

  const spendWaterDrops = (amount: number): boolean => {
    if (stats.waterDrops >= amount) {
      saveStats({ ...stats, waterDrops: stats.waterDrops - amount });
      return true;
    }
    return false;
  };

  const completeLesson = () => {
    const newStats = {
      ...stats,
      completedLessons: stats.completedLessons + 1,
      currentStreak: stats.currentStreak + 1
    };
    addWaterDrops(5); // Reward for completing lesson
    saveStats(newStats);
  };

  const waterPlant = (amount: number): boolean => {
    if (spendWaterDrops(amount)) {
      const newGrowthLevel = Math.min(100, stats.plantGrowthLevel + amount * 2);
      saveStats({ ...stats, plantGrowthLevel: newGrowthLevel });
      return true;
    }
    return false;
  };

  const plantTree = () => {
    if (stats.plantGrowthLevel >= 100) {
      saveStats({
        ...stats,
        totalTrees: stats.totalTrees + 1,
        plantGrowthLevel: 0
      });
    }
  };

  return (
    <UserContext.Provider value={{
      stats,
      addWaterDrops,
      spendWaterDrops,
      completeLesson,
      waterPlant,
      plantTree
    }}>
      {children}
    </UserContext.Provider>
  );
};