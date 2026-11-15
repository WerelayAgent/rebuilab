import React, { useState, useEffect } from 'react';
import { X, Layers, Copy, Check, QrCode, ArrowRight, ExternalLink, Sparkles, Loader2, Clock, CheckCircle2, Globe, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppCategory, RebuiltApp } from '../types/rebuilab';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTarget?: string;
  onAppCreated?: (app: RebuiltApp) => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({
  isOpen,
  onClose,
  initialTarget = '',
  onAppCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [target, setTarget] = useState(initialTarget);
  const [tokenName, setTokenName] = useState('');
  const [ticker, setTicker] = useState('');
  const [category, setCategory] = useState<AppCategory>('utility');
  const [description, setDescription] = useState('');
  const [initialBuy, setInitialBuy] = useState<number>(0);

  // Checkout State
  const [depositAddress, setDepositAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [deployStepIndex, setDeployStepIndex] = useState(0);

  useEffect(() => {
    if (initialTarget) {
      setTarget(initialTarget);
      autoFill(initialTarget);
    }
  }, [initialTarget]);

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const autoFill = (val: string) => {
    const clean = val.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
    const parts = clean.split('.');
    const namePart = parts[0] === 'www' || parts[0] === 'app' ? parts[1] || 'App' : parts[0];
    const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    setTokenName(`${capitalized} Rebuilt`);
    setTicker(capitalized.substring(0, 5).toUpperCase());
    setDescription(`Autonomous in-browser Web3 rebuild of ${clean} launched on Solana via RebuiLab.`);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTarget(val);
    if (!tokenName) autoFill(val);
  };

  const handleProceedToPayment = () => {
    if (!target.trim()) return;
    const fakeAddress = `RLAB${Math.random().toString(36).substring(2, 8).toUpperCase()}${ticker.substring(0, 3)}9xRebuildVault`;
    setDepositAddress(fakeAddress);
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setStep(3);
    setDeployStepIndex(0);

    const steps = [
      'Detecting 0.05 SOL deposit on Solana mempool...',
      'Decompiling target DOM & extracting component tree...',
      'Synthesizing interactive in-browser canvas...',
      'Minting paired pump.fun bonding curve token...',
    ];

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setDeployStepIndex(idx + 1);
        if (idx === steps.length - 1) {
          confetti({
            particleCount: 110,
            spread: 75,
            origin: { y: 0.6 },
          });
          if (onAppCreated) {
            onAppCreated({
              id: `app-${Date.now()}`,
              title: tokenName || 'Custom Rebuilt App',
              originalUrl: target.startsWith('http') ? target : `https://${target}`,
              category,
              ticker: ticker || 'REBUILD',
              mint: `${depositAddress.substring(0, 24)}pump`,
              bondingCurvePct: 1,
              marketCapUsd: 14200,
              volume24hSol: 0.05,
              priceSol: 0.0000014,
              change24h: 18.5,
              creator: 'You',
              description: description || `Autonomous rebuild of ${target}`,
              createdAt: 'Just now',
              previewType: 'generic',
            });
          }
        }
      }, (idx + 1) * 1400);
    });
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c0d14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-slate-950 font-bold text-xs flex items-center justify-center">
              0.05
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                {step === 1 && 'Rebuild & Launch Coin'}
                {step === 2 && '0.05 SOL Permissionless Checkout'}
                {step === 3 && 'Synthesizing On-Chain'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {step === 1 && 'Step 1/3: App & Token Parameters'}
                {step === 2 && 'Step 2/3: Scan or Send Deposit'}
                {step === 3 && 'Step 3/3: Rebuild Live'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* STEP 1: Form */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Target Website URL / Concept / Dead CA
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#00f2fe]">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={target}
                    onChange={handleTargetChange}
                    placeholder="e.g. app.uniswap.org or flappybird.io"
                    className="w-full bg-[#121420] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
              </div>

              {/* Name & Ticker */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Token Name
                  </label>
                  <input
                    type="text"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="e.g. Uniswap Mini"
                    className="w-full bg-[#121420] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Ticker ($)
                  </label>
                  <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="e.g. SWAP"
                    maxLength={8}
                    className="w-full bg-[#121420] border border-white/10 rounded-xl px-3.5 py-2 text-sm font-mono uppercase text-white focus:outline-none focus:border-[#00f2fe]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Category
                </label>
                <div className="grid grid-cols-5 gap-2 text-xs font-mono">
                  {(['finance', 'game', 'social', 'utility', 'crypto'] as AppCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-1.5 rounded-lg border capitalize transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-white text-slate-950 font-bold border-white'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Rebuild Narrative
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-[#121420] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
                  placeholder="Explain why this project is being rebuilt on Solana..."
                />
              </div>

              {/* Initial Buy */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Initial Dev Snipe (Optional):</span>
                  <span className="text-[#22c55e] font-bold">{initialBuy} SOL</span>
                </div>
                <div className="flex items-center gap-2">
                  {[0, 0.1, 0.5, 1.0].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setInitialBuy(amt)}
                      className={`flex-1 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        initialBuy === amt
                          ? 'bg-white text-slate-950 font-bold border-white'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {amt === 0 ? 'None' : `${amt} SOL`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Rebuild Compilation Fee:</span>
                  <span className="text-white font-bold">0.05 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonding Curve:</span>
                  <span className="text-[#00f2fe]">pump.fun Solana CPMM</span>
                </div>
                <div className="flex justify-between">
                  <span>$RLAB Deflationary Burn:</span>
                  <span className="text-orange-400 font-bold">10% Platform Cut</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={!target.trim()}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-sm transition-all shadow-lg disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to 0.05 SOL Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Checkout Screen */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-left flex items-start gap-2">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">No wallet connection needed.</span> Send exact{' '}
                  <strong className="text-white font-mono">0.05 SOL</strong> to the address below. Your app will be synthesized upon transaction confirmation.
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <span>Address reserved for:</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                  {formatTimer(timeLeft)}
                </span>
              </div>

              {/* QR Code */}
              <div className="mx-auto w-44 h-44 p-3 bg-white rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" rx="4" />
                  <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                  <rect x="10" y="10" width="10" height="10" />
                  
                  <rect x="70" y="0" width="30" height="30" rx="4" />
                  <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                  <rect x="80" y="10" width="10" height="10" />
                  
                  <rect x="0" y="70" width="30" height="30" rx="4" />
                  <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                  <rect x="10" y="80" width="10" height="10" />
                  
                  <rect x="40" y="12" width="10" height="8" />
                  <rect x="55" y="15" width="8" height="8" />
                  <rect x="40" y="42" width="8" height="16" />
                  <rect x="52" y="42" width="16" height="8" />
                  <rect x="70" y="40" width="10" height="10" />
                  <rect x="40" y="72" width="12" height="12" />
                  <rect x="70" y="70" width="12" height="12" />
                </svg>
                <span className="text-[10px] font-mono font-bold text-slate-800 mt-1">
                  0.05 SOL · SOLANA
                </span>
              </div>

              {/* Address Box */}
              <div className="text-left space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  Unique Solana Deposit Address:
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#121420] border border-white/10 font-mono text-xs text-white">
                  <span className="truncate flex-1">{depositAddress}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Verify Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>I've Sent 0.05 SOL (Verify Now)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  ← Modify Parameters
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Synthesis & Success */}
          {step === 3 && (
            <div className="py-6 space-y-6 text-center">
              {deployStepIndex < 4 ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Rebuilding ${ticker || 'APP'}
                  </h4>
                  <div className="space-y-2 max-w-sm mx-auto text-left font-mono text-xs">
                    {[
                      'Detecting 0.05 SOL deposit on Solana mempool...',
                      'Decompiling target DOM & extracting component tree...',
                      'Synthesizing interactive in-browser canvas...',
                      'Minting paired pump.fun bonding curve token...',
                    ].map((stepText, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 transition-all ${
                          idx < deployStepIndex
                            ? 'text-[#22c55e]'
                            : idx === deployStepIndex
                            ? 'text-white font-semibold animate-pulse'
                            : 'text-slate-600'
                        }`}
                      >
                        {idx < deployStepIndex ? (
                          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </div>
                        )}
                        <span>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e]">
                    <Layers className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-2xl text-white">
                      Rebuild & Token Successfully Live!
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      ${ticker} is now paired with its interactive canvas on pump.fun
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Token Mint:</span>
                      <span className="text-white truncate max-w-[200px]">
                        {depositAddress.substring(0, 16)}...pump
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Rebuilt:</span>
                      <span className="text-[#00f2fe]">{target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bonding Curve:</span>
                      <span className="text-[#22c55e]">pump.fun standard</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`https://pump.fun/coin/${depositAddress.substring(0, 20)}pump`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 rounded-xl bg-[#00f2fe] hover:bg-[#00d6e0] text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Trade on pump.fun</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={onClose}
                      className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono font-bold text-xs transition-all cursor-pointer"
                    >
                      Close & View Feed
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
