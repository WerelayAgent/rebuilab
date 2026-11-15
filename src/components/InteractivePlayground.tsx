import React, { useState, useEffect } from 'react';
import { Play, ArrowRightLeft, Palette, Gamepad2, Sparkles, Terminal, CheckCircle2, RotateCcw, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swap' | 'flappy' | 'paint'>('swap');

  // SWAP STATE
  const [sellAmount, setSellAmount] = useState('1');
  const [buyAmount, setBuyAmount] = useState('5400');
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // FLAPPY STATE
  const [flappyScore, setFlappyScore] = useState(0);
  const [flappyBirdY, setFlappyBirdY] = useState(50); // percentage
  const [flappyGameOver, setFlappyGameOver] = useState(false);

  // PIXEL PAINT STATE (8x8 grid)
  const initialPixels = Array(64).fill('#161822');
  const [pixels, setPixels] = useState<string[]>(initialPixels);
  const [selectedColor, setSelectedColor] = useState('#00f2fe');

  const palette = ['#00f2fe', '#22c55e', '#a855f7', '#f59e0b', '#ef4444', '#ffffff', '#161822'];

  const handleSwap = () => {
    setSwapLoading(true);
    setSwapSuccess(false);
    setTimeout(() => {
      setSwapLoading(false);
      setSwapSuccess(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setSwapSuccess(false), 3000);
    }, 1200);
  };

  const handleFlap = () => {
    if (flappyGameOver) {
      setFlappyBirdY(50);
      setFlappyScore(0);
      setFlappyGameOver(false);
      return;
    }
    setFlappyBirdY((prev) => Math.max(10, prev - 20));
    setFlappyScore((prev) => prev + 1);
  };

  useEffect(() => {
    if (activeTab !== 'flappy' || flappyGameOver) return;
    const gravity = setInterval(() => {
      setFlappyBirdY((prev) => {
        if (prev >= 85) {
          setFlappyGameOver(true);
          return 85;
        }
        return prev + 6;
      });
    }, 200);
    return () => clearInterval(gravity);
  }, [activeTab, flappyGameOver]);

  const handlePixelClick = (index: number) => {
    const next = [...pixels];
    next[index] = selectedColor;
    setPixels(next);
  };

  const clearCanvas = () => {
    setPixels(initialPixels);
  };

  return (
    <section id="playground" className="py-16 md:py-24 border-t border-white/5 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-xs font-mono text-[#00f2fe] mb-4">
            <Terminal className="w-4 h-4" />
            <span>Interactive In-Browser Rebuild Canvas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Playable Rebuild Sandbox
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            See how RebuiLab decompiles web applications into fully functional, on-chain playable prototypes paired with a Solana pump.fun token.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0e1017] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#141620] border-b border-white/5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 ml-2">rebuilab://sandbox-canvas-v2.sol</span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/5">
              <button
                onClick={() => setActiveTab('swap')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'swap' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Uniswap Mini</span>
              </button>
              <button
                onClick={() => setActiveTab('flappy')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'flappy' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Flappy Sol</span>
              </button>
              <button
                onClick={() => setActiveTab('paint')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'paint' ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Pixel Paint</span>
              </button>
            </div>
          </div>

          {/* Sandbox Body Content */}
          <div className="p-6 sm:p-10 min-h-[380px] flex items-center justify-center">
            
            {/* 1. UNISWAP MINI CANVAS */}
            {activeTab === 'swap' && (
              <div className="w-full max-w-sm p-5 rounded-2xl bg-[#141622] border border-white/10 shadow-xl space-y-4 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="text-[#00f2fe]">◆</span> Uniswap Mini ($SWAP)
                  </span>
                  <span className="text-[11px] text-[#22c55e]">0.3% Fee</span>
                </div>

                {/* You Pay */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>You Pay</span>
                    <span>Bal: 12.4 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => {
                        setSellAmount(e.target.value);
                        setBuyAmount(String(Number(e.target.value || 0) * 5400));
                      }}
                      className="bg-transparent text-xl font-bold text-white outline-none w-28"
                    />
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-xs">
                      SOL
                    </span>
                  </div>
                </div>

                {/* Arrow Divider */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#1c1f2e] border border-white/10 flex items-center justify-center text-slate-400">
                    ↓
                  </div>
                </div>

                {/* You Receive */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>You Receive (Estimated)</span>
                    <span>1 SOL = 5,400 SWAP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      readOnly
                      value={buyAmount}
                      className="bg-transparent text-xl font-bold text-[#00f2fe] outline-none w-32"
                    />
                    <span className="px-2.5 py-1 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] font-bold text-xs">
                      $SWAP
                    </span>
                  </div>
                </div>

                {/* Swap CTA Button */}
                <button
                  onClick={handleSwap}
                  disabled={swapLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#22c55e] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {swapLoading ? (
                    <span>Routing through Raydium CPMM...</span>
                  ) : swapSuccess ? (
                    <span className="flex items-center gap-1.5 text-slate-950">
                      <CheckCircle2 className="w-4 h-4" /> Swap Filled on Solana!
                    </span>
                  ) : (
                    <span>Execute Instant Swap</span>
                  )}
                </button>
              </div>
            )}

            {/* 2. FLAPPY SOL CANVAS */}
            {activeTab === 'flappy' && (
              <div className="w-full max-w-md flex flex-col items-center space-y-4">
                <div className="relative w-full h-64 rounded-2xl bg-gradient-to-b from-[#0b1329] to-[#040714] border border-white/10 overflow-hidden shadow-inner flex flex-col justify-between p-4">
                  
                  {/* Score & HUD */}
                  <div className="flex items-center justify-between z-10 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-black/60 text-white font-bold border border-white/10">
                      Score: {flappyScore}
                    </span>
                    <span className="text-[#22c55e] font-bold">Token: $FLAPPY</span>
                  </div>

                  {/* Animated Pipe Obstacle simulation */}
                  <div className="absolute right-12 top-0 w-8 h-20 bg-emerald-600/70 rounded-b-md border border-emerald-400/50" />
                  <div className="absolute right-12 bottom-0 w-8 h-20 bg-emerald-600/70 rounded-t-md border border-emerald-400/50" />

                  {/* The Bird */}
                  <div
                    className="absolute left-1/4 transition-all duration-150 transform -translate-y-1/2"
                    style={{ top: `${flappyBirdY}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center font-bold text-slate-950 text-xs">
                      🐦
                    </div>
                  </div>

                  {/* Ground */}
                  <div className="text-center z-10">
                    {flappyGameOver ? (
                      <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                        Game Over! Tap Flap to Restart
                      </div>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        Tap Flap button to counter Solana gravity
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleFlap}
                  className="px-8 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono font-bold text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{flappyGameOver ? 'Restart Flappy' : 'Flap Bird! (+1 Score)'}</span>
                </button>
              </div>
            )}

            {/* 3. PIXEL PAINT CANVAS */}
            {activeTab === 'paint' && (
              <div className="flex flex-col items-center space-y-4 font-mono">
                
                {/* Palette picker */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-xs text-slate-400 mr-1">Color:</span>
                  {palette.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-md border transition-transform cursor-pointer ${
                        selectedColor === c ? 'scale-125 border-white shadow' : 'border-transparent hover:scale-110'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="p-1 text-slate-400 hover:text-white ml-2 transition-colors"
                    title="Clear Canvas"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* 8x8 Interactive Grid */}
                <div className="grid grid-cols-8 gap-1 p-3 rounded-2xl bg-black/60 border border-white/10 shadow-2xl">
                  {pixels.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePixelClick(idx)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] border border-white/5 cursor-pointer hover:opacity-80 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="text-xs text-slate-400">
                  Draw collaborative pixel art. Every pixel change burns 100 $PAINT tokens on-chain.
                </div>
              </div>
            )}

          </div>

          {/* Bottom Bar Info */}
          <div className="px-6 py-3 bg-[#11131c] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />
              State: Live DOM synthesized · React 19 Engine
            </span>
            <div className="flex items-center gap-3">
              <span>Token: $RLAB Paired</span>
              <span>Curve: 100% Fair Launch</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
