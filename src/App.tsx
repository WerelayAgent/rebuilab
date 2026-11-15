import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroRebuildInput } from './components/HeroRebuildInput';
import { InteractivePlayground } from './components/InteractivePlayground';
import { RebuildShowcaseGrid } from './components/RebuildShowcaseGrid';
import { RevivalVaultSection } from './components/RevivalVaultSection';
import { LabMetricsBanner } from './components/LabMetricsBanner';
import { Footer } from './components/Footer';
import { LaunchModal } from './components/LaunchModal';
import { MOCK_REBUILDS, INITIAL_ENGINE_STATS } from './data/mockRebuilds';
import { RebuiltApp, EngineStats } from './types/rebuilab';

export const App: React.FC = () => {
  const [apps, setApps] = useState<RebuiltApp[]>(MOCK_REBUILDS);
  const [stats, setStats] = useState<EngineStats>(INITIAL_ENGINE_STATS);
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [launchInitialTarget, setLaunchInitialTarget] = useState('');

  const handleOpenLaunch = (target?: string) => {
    setLaunchInitialTarget(target || '');
    setLaunchModalOpen(true);
  };

  const handleOpenRevival = () => {
    const el = document.getElementById('revival');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlayApp = (_app: RebuiltApp) => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAppCreated = (newApp: RebuiltApp) => {
    setApps((prev) => [newApp, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalRebuilds: prev.totalRebuilds + 1,
      totalSolDeployed: Number((prev.totalSolDeployed + 0.05).toFixed(2)),
    }));
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f3f3f1] selection:bg-[#00f2fe]/20 selection:text-[#00f2fe] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenLaunch={handleOpenLaunch}
        onOpenRevival={handleOpenRevival}
        rlabPrice={0.0614}
        burnedCount={stats.rlabBurned}
      />

      <main className="flex-1">
        {/* Hero Section with Quick Rebuild Input */}
        <HeroRebuildInput
          onRebuildTarget={handleOpenLaunch}
          stats={stats}
        />

        {/* Interactive In-Browser Sandbox Playground */}
        <InteractivePlayground />

        {/* Live Rebuilds Showcase Grid */}
        <RebuildShowcaseGrid
          apps={apps}
          onSelectPlayApp={handleSelectPlayApp}
          onLaunchNew={() => handleOpenLaunch()}
        />

        {/* Dead Token / CTO Revival Vault */}
        <RevivalVaultSection
          onReviveSuccess={(token) => handleOpenLaunch(token.tokenName)}
        />

        {/* 3-Step Mechanics Banner */}
        <LabMetricsBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* 0.05 SOL Launch Modal */}
      <LaunchModal
        isOpen={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
        initialTarget={launchInitialTarget}
        onAppCreated={handleAppCreated}
      />
    </div>
  );
};

export default App;
