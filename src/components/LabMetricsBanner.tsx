import React from 'react';
import { Terminal, Shield, Zap, RefreshCw, Cpu, Layers } from 'lucide-react';

export const LabMetricsBanner: React.FC = () => {
  return (
    <section className="py-16 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            How RebuiLab Works in 3 Steps
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Permissionless, reverse-engineered, and instant on Solana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="text-3xl font-display font-black text-[#00f2fe]">01</div>
            <h4 className="font-bold text-white text-base">Paste Any URL or Concept</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target web applications, classic arcade games, utility tools, or dead tokens. The crawler extracts the DOM, stylesheets, and logic structure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="text-3xl font-display font-black text-[#22c55e]">02</div>
            <h4 className="font-bold text-white text-base">Synthesize Interactive Canvas</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              RebuiLab's REA (Reverse Engineering Agent) compiles a clean, playable in-browser canvas that users can interact with directly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="text-3xl font-display font-black text-orange-400">03</div>
            <h4 className="font-bold text-white text-base">Launch for 0.05 SOL</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send 0.05 SOL to the non-custodial address. A paired token mints on pump.fun with automated Raydium migration at $69k market cap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
