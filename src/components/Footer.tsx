import React from 'react';
import { ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050608] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#14151d] border border-white/10 flex items-center justify-center p-1.5">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="rounded-[2px] bg-white" />
                  <div className="rounded-[2px] bg-white/20" />
                  <div className="rounded-[2px] bg-white/20" />
                  <div className="rounded-[2px] bg-[#22c55e]" />
                </div>
              </div>
              <span className="font-display font-black text-lg text-white">
                Rebui<span className="text-[#00f2fe]">Lab</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Launch a coin. Rebuild anything. The autonomous reverse-engineering compiler and token launchpad on Solana.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Inspired by tryrebuilt.fun · Built on Solana
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#engine" className="hover:text-white transition-colors">
                  Rebuild Engine
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Live Applications
                </a>
              </li>
              <li>
                <a href="#playground" className="hover:text-white transition-colors">
                  Sandbox Canvas
                </a>
              </li>
              <li>
                <a href="#revival" className="hover:text-white transition-colors">
                  CTO Revival Vault
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              Solana Ecosystem
            </h5>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00f2fe] transition-colors flex items-center gap-1"
                >
                  <span>pump.fun bonding</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://raydium.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00f2fe] transition-colors flex items-center gap-1"
                >
                  <span>Raydium CPMM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com/solana"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00f2fe] transition-colors flex items-center gap-1"
                >
                  <span>DexScreener chart</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Contracts */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              Verified Contracts
            </h5>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">$RLAB Token Mint</span>
                <span className="text-[#00f2fe] truncate block">Rlab9xZ4wL2y...pump</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">RebuiLab Compiler Program</span>
                <span className="text-[#22c55e] truncate block">RebuiLabProgram111111111111111</span>
              </div>
            </div>
          </div>

        </div>

        {/* Huge Branding Text Watermark */}
        <div className="pt-8 pb-4 text-center select-none overflow-hidden">
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white/[0.03] tracking-tighter hover:text-white/[0.05] transition-colors">
            REBUILAB
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © 2026 RebuiLab. Autonomous Web3 synthesis on Solana.
          </p>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>Fast. Cheap. Permissionless.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
