import React, { useState } from 'react';
import { Layers, Cpu, Flame, Wallet, Sparkles, ExternalLink, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenLaunch: (target?: string) => void;
  onOpenRevival: () => void;
  rlabPrice?: number;
  burnedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLaunch,
  onOpenRevival,
  rlabPrice = 0.0614,
  burnedCount = 14250000,
}) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080808]/90 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#14151d] border border-white/10 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 duration-200">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="rounded-[3px] bg-white group-hover:bg-[#00f2fe] transition-colors" />
                  <div className="rounded-[3px] bg-white/20" />
                  <div className="rounded-[3px] bg-white/20" />
                  <div className="rounded-[3px] bg-[#22c55e]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                  Rebui<span className="text-[#00f2fe]">Lab</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-bold">
                    SOL
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono tracking-wider -mt-0.5">
                  Rebuild Anything.
                </span>
              </div>
            </a>

            {/* Live Ticker Pill */}
            <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-slate-400">$RLAB:</span>
              <span className="text-white font-semibold">${rlabPrice.toFixed(4)}</span>
              <span className="text-[#22c55e] font-semibold text-[11px]">+32.8%</span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-orange-400 text-[11px]">
                <Flame className="w-3.5 h-3.5" />
                {(burnedCount / 1_000_000).toFixed(1)}M Burned
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#engine" className="hover:text-white transition-colors">
              Rebuild Engine
            </a>
            <a href="#showcase" className="hover:text-white transition-colors">
              Live Rebuilds
            </a>
            <a href="#playground" className="hover:text-white transition-colors flex items-center gap-1">
              Sandbox Canvas
              <span className="text-[10px] bg-[#00f2fe]/10 text-[#00f2fe] px-1.5 py-0.5 rounded-full font-mono">Interactive</span>
            </a>
            <a href="#revival" className="hover:text-white transition-colors flex items-center gap-1">
              CTO Revival
              <span className="text-[10px] bg-[#22c55e]/10 text-[#22c55e] px-1.5 py-0.5 rounded-full font-mono">Fair</span>
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenRevival()}
              className="px-3.5 py-2 text-xs font-mono font-medium rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#22c55e]" />
              Revive Dead Token
            </button>

            <button
              onClick={() => onOpenLaunch()}
              className="px-4 py-2 text-xs font-mono font-bold rounded-lg text-slate-950 bg-white hover:bg-slate-200 transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              Launch for 0.05 SOL
            </button>

            <button
              onClick={() => setWalletConnected(!walletConnected)}
              className={`px-3 py-2 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
                walletConnected
                  ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              {walletConnected ? '7xP...91aK' : 'Connect'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenLaunch()}
              className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-white text-slate-950 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              Launch
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0d0e14] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono">
            <span className="text-slate-400">$RLAB: <span className="text-white">${rlabPrice.toFixed(4)}</span></span>
            <span className="text-orange-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> {(burnedCount / 1_000_000).toFixed(1)}M Burned
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1 text-sm">
            <a
              href="#engine"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
            >
              Rebuild Engine
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
            >
              Live Rebuilds
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
            >
              Interactive Sandbox Canvas
            </a>
            <a
              href="#revival"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-white/5 rounded-lg"
            >
              CTO Revival Vault
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRevival();
              }}
              className="w-full py-2.5 text-xs font-mono font-semibold rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-[#22c55e]" />
              Revive Dead Token (CTO)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLaunch();
              }}
              className="w-full py-2.5 text-xs font-mono font-bold rounded-lg bg-white text-slate-950 flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              Launch Rebuild for 0.05 SOL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
