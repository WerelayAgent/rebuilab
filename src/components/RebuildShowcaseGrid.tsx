import React, { useState } from 'react';
import { Layers, Copy, Check, ExternalLink, ArrowUpRight, Zap, Play, Filter } from 'lucide-react';
import { AppCategory, RebuiltApp } from '../types/rebuilab';

interface RebuildShowcaseGridProps {
  apps: RebuiltApp[];
  onSelectPlayApp: (app: RebuiltApp) => void;
  onLaunchNew: () => void;
}

export const RebuildShowcaseGrid: React.FC<RebuildShowcaseGridProps> = ({
  apps,
  onSelectPlayApp,
  onLaunchNew,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyMint = (id: string, mint: string) => {
    navigator.clipboard.writeText(mint);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredApps = apps.filter((app) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'graduated') return app.bondingCurvePct >= 100;
    return app.category === selectedCategory;
  });

  return (
    <section id="showcase" className="py-16 md:py-24 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-xs font-mono text-[#22c55e] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Synthesized Applications & Tokens</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Live Rebuild Feed
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Interactive Web3 canvases backed by Solana bonding curve tokens.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 overflow-x-auto">
            {['all', 'finance', 'game', 'social', 'utility', 'graduated'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Rebuilds' : cat === 'graduated' ? 'Graduated 🎓' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rebuilt Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="group p-5 rounded-2xl bg-[#0e1017] border border-white/10 hover:border-[#00f2fe]/40 transition-all duration-200 hover:shadow-xl hover:shadow-[#00f2fe]/5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-base text-white truncate max-w-[170px]">
                        {app.title}
                      </h4>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">
                        ${app.ticker}
                      </span>
                    </div>
                    <a
                      href={app.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#00f2fe] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{app.originalUrl.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {/* 24h Change */}
                  <div
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      app.change24h >= 0
                        ? 'bg-[#22c55e]/15 text-[#22c55e]'
                        : 'bg-rose-500/15 text-rose-400'
                    }`}
                  >
                    {app.change24h >= 0 ? `+${app.change24h}%` : `${app.change24h}%`}
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3.5 leading-relaxed">
                  {app.description}
                </p>

                {/* Market Cap & 24h Volume */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono mb-3.5">
                  <div>
                    <span className="text-slate-500 block text-[10px]">MARKET CAP</span>
                    <span className="font-bold text-white text-sm">
                      ${app.marketCapUsd.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">24H VOLUME</span>
                    <span className="font-bold text-[#22c55e] text-sm">
                      {app.volume24hSol.toFixed(1)} SOL
                    </span>
                  </div>
                </div>

                {/* Bonding Curve Progress */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Curve Progress:</span>
                    <span className={`font-bold ${app.bondingCurvePct >= 100 ? 'text-[#22c55e]' : 'text-white'}`}>
                      {app.bondingCurvePct >= 100 ? '100% (Raydium)' : `${app.bondingCurvePct}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        app.bondingCurvePct >= 100
                          ? 'bg-gradient-to-r from-[#22c55e] to-[#00f2fe]'
                          : 'bg-gradient-to-r from-[#00f2fe] to-white'
                      }`}
                      style={{ width: `${Math.min(app.bondingCurvePct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions: Copy CA & Trade */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => handleCopyMint(app.id, app.mint)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-mono"
                  title="Copy Token CA"
                >
                  {copiedId === app.id ? (
                    <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>CA</span>
                </button>

                <button
                  onClick={() => onSelectPlayApp(app)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Sandbox</span>
                </button>

                <a
                  href={`https://pump.fun/coin/${app.mint}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Trade</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-black text-2xl text-white">
              Have a web app or project in mind?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Decompile and rebuild any public website in 10 seconds. Paired with a live pump.fun bonding curve.
            </p>
          </div>
          <button
            onClick={onLaunchNew}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-sm shadow-xl cursor-pointer whitespace-nowrap"
          >
            Launch Rebuild for 0.05 SOL
          </button>
        </div>

      </div>
    </section>
  );
};
