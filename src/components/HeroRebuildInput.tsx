import React, { useState } from 'react';
import { Layers, Sparkles, Terminal, ArrowRight, Shield, Zap, RefreshCw, Globe, Code2 } from 'lucide-react';
import { EngineStats } from '../types/rebuilab';

interface HeroRebuildInputProps {
  onRebuildTarget: (target: string) => void;
  stats: EngineStats;
}

export const HeroRebuildInput: React.FC<HeroRebuildInputProps> = ({
  onRebuildTarget,
  stats,
}) => {
  const [targetInput, setTargetInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput.trim()) return;
    onRebuildTarget(targetInput.trim());
  };

  const handlePill = (url: string) => {
    setTargetInput(url);
    onRebuildTarget(url);
  };

  return (
    <div id="engine" className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-radial-lab overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00f2fe]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 text-xs font-mono shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
          </span>
          <span className="text-slate-300">Inspired by tryrebuilt.fun · Powered by Solana</span>
          <span className="text-[#00f2fe] font-semibold">Autonomous REA v2</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.06]">
          Launch a coin. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2fe] to-[#22c55e]">
            Rebuild anything.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          The autonomous compiler on Solana. Paste any website URL, app concept, or dead token address —
          <strong className="text-white font-medium"> RebuiLab</strong> synthesizes an interactive playable in-browser canvas and deploys a live pump.fun bonding curve.
        </p>

        {/* Interactive Search & Rebuild Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-1.5 sm:p-2 rounded-2xl bg-[#0e1017] border border-white/10 shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center gap-2 group focus-within:border-[#00f2fe]/60 transition-all"
          >
            <div className="flex items-center flex-1 w-full px-3 py-2 text-left">
              <Globe className="w-5 h-5 text-[#00f2fe] mr-2 shrink-0" />
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Enter any URL, app name, or token CA (e.g. uniswap.org, flappybird.io)"
                className="w-full bg-transparent text-white placeholder-slate-500 font-mono text-xs sm:text-sm outline-none focus:ring-0"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-4 h-4" />
                <span>Rebuild for 0.05 SOL</span>
              </button>
            </div>
          </form>

          {/* Quick Preset Pills */}
          <div className="mt-3.5 flex items-center justify-center flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">Popular Targets:</span>
            {[
              { label: 'app.uniswap.org', val: 'https://app.uniswap.org' },
              { label: 'flappybird.io', val: 'https://flappybird.io' },
              { label: 'x.com', val: 'https://x.com' },
              { label: 'jspaint.app', val: 'https://jspaint.app' },
              { label: 'wordle.com', val: 'https://nytimes.com/games/wordle' },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => handlePill(p.val)}
                className="px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-[#00f2fe] border border-white/5 transition-all cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/10 text-[#00f2fe] flex items-center justify-center mb-2 font-mono">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Reverse Engineering Agent (REA)</h4>
            <p className="text-xs text-slate-400 mt-1">Autonomous crawler decodes UI, assets, and logic into an interactive canvas.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center mb-2 font-mono">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">0.05 SOL Permissionless</h4>
            <p className="text-xs text-slate-400 mt-1">Direct deposit checkout with QR code and 15-minute reservation timer. No login needed.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2 font-mono">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">CTO Dead Coin Revival</h4>
            <p className="text-xs text-slate-400 mt-1">Paste any rugged or dead token CA to rebuild the frontend with a fair bonding curve.</p>
          </div>
        </div>

        {/* Live Laboratory Metrics Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-4xl mx-auto shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-2 md:pt-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Apps Rebuilt</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                {stats.totalRebuilds.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#22c55e] font-mono mt-0.5">+54 deployed today</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Total SOL Deployed</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00f2fe] mt-1">
                {stats.totalSolDeployed.toFixed(1)} SOL
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">≈ ${(stats.totalSolDeployed * 195).toLocaleString()} USD</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Active Compilers</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#22c55e] mt-1">
                {stats.activeCompilers} Nodes
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Global synthesis online</div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">$RLAB Burned</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-orange-400 mt-1">
                {(stats.rlabBurned / 1_000_000).toFixed(2)}M
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Continuous deflation</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
