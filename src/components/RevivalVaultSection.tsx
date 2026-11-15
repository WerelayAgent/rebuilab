import React, { useState } from 'react';
import { Cpu, RefreshCw, CheckCircle, ShieldAlert, ArrowRight, Zap, Search, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_REVIVALS } from '../data/mockRebuilds';
import { RevivalToken } from '../types/rebuilab';

interface RevivalVaultSectionProps {
  onReviveSuccess: (token: any) => void;
}

export const RevivalVaultSection: React.FC<RevivalVaultSectionProps> = ({ onReviveSuccess }) => {
  const [caInput, setCaInput] = useState('');
  const [reviving, setReviving] = useState(false);
  const [revivalResult, setRevivalResult] = useState<RevivalToken | null>(null);

  const handleAuditCa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caInput.trim()) return;

    setReviving(true);
    setRevivalResult(null);

    setTimeout(() => {
      setReviving(false);
      const generated: RevivalToken = {
        id: `rev-${Date.now()}`,
        deadMint: caInput.trim(),
        tokenName: 'Revived Community CTO',
        ticker: 'R-CTO',
        oldAthMcap: 2400000,
        holdersSnapshot: 1540,
        revivalProgress: 100,
        status: 'live',
      };
      setRevivalResult(generated);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }, 2000);
  };

  return (
    <section id="revival" className="py-16 md:py-24 border-t border-white/5 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 mb-4">
            <Cpu className="w-4 h-4" />
            <span>Community Takeover & Revival Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Dead Coin Revival Vault
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Did the dev rugpull or abandon your favorite token? Paste the old Solana contract address below.
            RebuiLab takes an on-chain holder snapshot, rebuilds the brand frontend, and launches a fresh, 100% fair bonding curve.
          </p>
        </div>

        {/* Input Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form
            onSubmit={handleAuditCa}
            className="flex items-center p-1.5 rounded-xl bg-[#121420] border border-white/10 focus-within:border-orange-500/50 transition-all shadow-xl"
          >
            <input
              type="text"
              value={caInput}
              onChange={(e) => setCaInput(e.target.value)}
              placeholder="Paste dead token CA (e.g. Rugged8vKnP...pump)"
              className="flex-1 bg-transparent px-3 text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={reviving || !caInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
            >
              {reviving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning State...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Audit & Rebuild</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Revival Result */}
        {revivalResult && (
          <div className="max-w-xl mx-auto mb-12 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Snapshot Verified ({revivalResult.holdersSnapshot} Wallets)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                100% Fair Launch
              </span>
            </div>
            <div className="text-slate-300">
              Old ATH Market Cap: ${(revivalResult.oldAthMcap).toLocaleString()} USD. Original holders automatically mapped to receive 15% community revival airdrop on the new bonding curve.
            </div>
            <button
              onClick={() => onReviveSuccess(revivalResult)}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs cursor-pointer transition-all"
            >
              Confirm 0.05 SOL Deployment for ${revivalResult.ticker}
            </button>
          </div>
        )}

        {/* Showcase of Revived Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_REVIVALS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#0e1017] border border-white/5 space-y-3 font-mono text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{rev.tokenName}</h4>
                  <span className="text-[#00f2fe] text-[11px]">${rev.ticker}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase">
                  {rev.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-slate-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Dead CA:</span>
                  <span className="text-white truncate max-w-[120px]">{rev.deadMint}</span>
                </div>
                <div className="flex justify-between">
                  <span>Old ATH MCap:</span>
                  <span className="text-white font-bold">${(rev.oldAthMcap).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Holders Snapshotted:</span>
                  <span className="text-emerald-400 font-bold">{rev.holdersSnapshot} addresses</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Revival Pipeline:</span>
                  <span className="text-orange-400 font-bold">{rev.revivalProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-[#22c55e]"
                    style={{ width: `${rev.revivalProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
