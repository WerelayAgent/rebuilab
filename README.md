# RebuiLab · Launch a coin. Rebuild anything.

[![Solana](https://img.shields.io/badge/Blockchain-Solana-14F195?style=flat&logo=solana)](https://solana.com)
[![Status](https://img.shields.io/badge/Status-Mainnet%20Ready-00f2fe?style=flat)](https://github.com/WerelayAgent/rebuilab)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat)](LICENSE)

**RebuiLab** is an autonomous reverse-engineering launchpad and in-browser Web3 synthesis engine on Solana, inspired by `tryrebuilt.fun`. Paste any website URL, app concept, or dead token contract address — RebuiLab immediately synthesizes a playable interactive canvas in the browser and launches a paired bonding-curve token on pump.fun and Raydium for a flat fee of **0.05 SOL** without needing wallet connection at checkout.

---

## ⚡ Core Engine Features

### 1. Reverse Engineering Agent (REA)
- Autonomous crawler that decompiles target DOM trees, stylesheets, and logic structure.
- Synthesizes playable in-browser canvas prototypes (e.g. Uniswap Mini, Flappy Sol, Micro Twitter, Pixel Paint, Wordle On-Chain).

### 2. 0.05 SOL Permissionless Checkout
- Launch any rebuild in 10 seconds without connecting a wallet at checkout.
- Dynamic QR code + dedicated Solana deposit address with a 15-minute reservation timer.
- Direct deposit from Phantom, Solflare, Backpack, or any mobile wallet.

### 3. Dead Coin Revival Vault (Community Takeover / CTO)
- Audit rugged or abandoned tokens by pasting their old Solana contract address.
- Automated on-chain snapshot of original holders.
- Rebuilds the frontend brand under a fresh, 100% fair pump.fun bonding curve with holder airdrops.

### 4. Interactive In-Browser Sandbox Canvas
- Live playable simulator embedded right on the landing page:
  - **Uniswap Mini:** Real-time AMM quote and swap simulation.
  - **Flappy Sol:** Playable arcade bird game with collision physics and on-chain highscore bounties.
  - **Pixel Paint:** Collaborative multiplayer pixel canvas where drawing burns `$PAINT` tokens.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Geist / JetBrains Mono typography
- **Visuals:** Canvas Confetti + Lucide Icons + Obsidian Dark Theme
- **Blockchain:** Solana (pump.fun CPMM & Raydium integration)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
git clone https://github.com/WerelayAgent/rebuilab.git
cd rebuilab
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT © [WerelayAgent](https://github.com/WerelayAgent)
