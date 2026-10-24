/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { LearnModule } from './components/LearnModule';
import { LabModule } from './components/LabModule';
import { SectorsModule } from './components/SectorsModule';
import { ChallengesModule } from './components/ChallengesModule';
import { GlossaryModule } from './components/GlossaryModule';
import { BadgesModal } from './components/BadgesModal';
import { CertificateModal } from './components/CertificateModal';
import { useGamification } from './hooks/useGamification';
import { Award, Sparkles, X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('matrizlab_theme') as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [activeTab, setActiveTab] = useState<NavTab>('learn');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const {
    progress,
    badges,
    levelInfo,
    newBadgeUnlocked,
    dismissBadgeModal,
    addXp,
    unlockBadge,
    completeChallenge,
    incrementExperimentCount,
    setUserName,
  } = useGamification();

  // Apply theme to html root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('matrizlab_theme', theme);
    } catch {
      // silent
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        xp={progress.xp}
        levelInfo={levelInfo}
        badges={badges}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Body with Sidebar + Active View */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          levelTitle={levelInfo.title}
          levelNumber={levelInfo.level}
          userName={progress.userName}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'learn' && (
            <LearnModule
              onUnlockBadge={unlockBadge}
              onAddXp={addXp}
              onGoToLab={() => setActiveTab('lab')}
            />
          )}

          {activeTab === 'lab' && (
            <LabModule
              onUnlockBadge={unlockBadge}
              onIncrementExperiment={incrementExperimentCount}
              onAddXp={addXp}
            />
          )}

          {activeTab === 'sectors' && (
            <SectorsModule
              onUnlockBadge={unlockBadge}
              onAddXp={addXp}
            />
          )}

          {activeTab === 'challenges' && (
            <ChallengesModule
              completedChallenges={progress.completedChallenges}
              onCompleteChallenge={completeChallenge}
              onOpenCertificate={() => setIsCertificateModalOpen(true)}
              xp={progress.xp}
            />
          )}

          {activeTab === 'glossary' && <GlossaryModule />}
        </main>
      </div>

      {/* Badges Gallery Modal */}
      <BadgesModal
        badges={badges}
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
      />

      {/* Printable Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        userName={progress.userName}
        onUpdateUserName={setUserName}
        xp={progress.xp}
        levelTitle={levelInfo.title}
        badgesCount={badges.filter((b) => b.unlocked).length}
      />

      {/* Instant Celebration Toast for newly unlocked badge */}
      {newBadgeUnlocked && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-4 rounded-2xl shadow-2xl border border-white/20 flex items-start gap-3 animate-slideUp">
          <div className="p-2.5 rounded-xl bg-white/20 text-amber-300">
            <Sparkles className="w-6 h-6 fill-amber-300" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
              ¡Nueva Insignia Desbloqueada! (+50 XP)
            </div>
            <div className="text-sm font-extrabold text-white mt-0.5">
              {newBadgeUnlocked.title}
            </div>
            <p className="text-xs text-purple-100 mt-0.5">
              {newBadgeUnlocked.description}
            </p>
          </div>
          <button
            onClick={dismissBadgeModal}
            className="text-white/70 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
