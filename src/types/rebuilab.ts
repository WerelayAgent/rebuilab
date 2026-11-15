export type AppCategory = 'finance' | 'social' | 'game' | 'utility' | 'crypto';

export interface RebuiltApp {
  id: string;
  title: string;
  originalUrl: string;
  category: AppCategory;
  ticker: string;
  mint: string;
  bondingCurvePct: number; // 0 to 100
  marketCapUsd: number;
  volume24hSol: number;
  priceSol: number;
  change24h: number;
  creator: string;
  description: string;
  createdAt: string;
  previewType: 'uniswap' | 'flappy' | 'twitter' | 'paint' | 'wordle' | 'generic';
}

export interface RevivalToken {
  id: string;
  deadMint: string;
  tokenName: string;
  ticker: string;
  oldAthMcap: number;
  holdersSnapshot: number;
  revivalProgress: number;
  status: 'auditing' | 'snapshotting' | 'rebuilding' | 'live';
}

export interface EngineStats {
  totalRebuilds: number;
  totalSolDeployed: number;
  activeCompilers: number;
  rlabBurned: number;
}
