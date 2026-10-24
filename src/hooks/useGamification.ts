import { useState, useEffect, useCallback } from 'react';
import { Badge, UserProgress } from '../types';
import { INITIAL_BADGES } from '../data/badges';

const STORAGE_KEY = 'matrizlab_progress_v1';

export function useGamification() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      xp: 40,
      level: 1,
      completedChallenges: [],
      unlockedBadges: [],
      matrixExperimentsCount: 0,
      userName: 'Estudiante de Ciencia de Datos',
    };
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<Badge | null>(null);

  // Sync badges with progress
  useEffect(() => {
    setBadges((prev) =>
      prev.map((b) => ({
        ...b,
        unlocked: progress.unlockedBadges.includes(b.id),
      }))
    );
  }, [progress.unlockedBadges]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // silent
    }
  }, [progress]);

  const calculateLevel = (xp: number): { level: number; title: string; nextLevelXp: number; currentLevelXp: number } => {
    if (xp < 150) {
      return { level: 1, title: 'Novato en Machine Learning', currentLevelXp: 0, nextLevelXp: 150 };
    }
    if (xp < 350) {
      return { level: 2, title: 'Analista de Métricas Jr.', currentLevelXp: 150, nextLevelXp: 350 };
    }
    if (xp < 600) {
      return { level: 3, title: 'Data Scientist Evaluador', currentLevelXp: 350, nextLevelXp: 600 };
    }
    return { level: 4, title: 'Master en Evaluación & ROI', currentLevelXp: 600, nextLevelXp: 1000 };
  };

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const target = INITIAL_BADGES.find((b) => b.id === badgeId);
      if (target) {
        setNewBadgeUnlocked(target);
      }
      return {
        ...prev,
        xp: prev.xp + 50,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const { level } = calculateLevel(newXp);
      return {
        ...prev,
        xp: newXp,
        level,
      };
    });
  }, []);

  const completeChallenge = useCallback((challengeId: string, rewardXp: number) => {
    setProgress((prev) => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      const updatedChallenges = [...prev.completedChallenges, challengeId];
      const newXp = prev.xp + rewardXp;
      const { level } = calculateLevel(newXp);

      // Check if all challenges completed
      if (updatedChallenges.length >= 5) {
        setTimeout(() => unlockBadge('badge-quiz-champion'), 500);
      }

      return {
        ...prev,
        completedChallenges: updatedChallenges,
        xp: newXp,
        level,
      };
    });
  }, [unlockBadge]);

  const incrementExperimentCount = useCallback(() => {
    setProgress((prev) => {
      const newCount = prev.matrixExperimentsCount + 1;
      if (newCount >= 3) {
        setTimeout(() => unlockBadge('badge-lab-experimenter'), 300);
      }
      return {
        ...prev,
        matrixExperimentsCount: newCount,
      };
    });
  }, [unlockBadge]);

  const setUserName = useCallback((name: string) => {
    setProgress((prev) => ({ ...prev, userName: name }));
  }, []);

  const levelInfo = calculateLevel(progress.xp);

  return {
    progress,
    badges,
    levelInfo,
    newBadgeUnlocked,
    dismissBadgeModal: () => setNewBadgeUnlocked(null),
    addXp,
    unlockBadge,
    completeChallenge,
    incrementExperimentCount,
    setUserName,
  };
}
