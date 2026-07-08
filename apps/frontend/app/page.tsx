import React from 'react';
import { OracleScoreCard } from '../components/OracleScoreCard';
import { RiskCalculatorCard } from '../components/RiskCalculatorCard';
import { AssetWatchlistTable } from '../components/AssetWatchlistTable';

export default function HomePage() {
  return (
    <main className="min-h-screen p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Top Bar / Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-6 gap-4">
        <div>
          <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider text-oracle-blue uppercase bg-blue-950/50 rounded-full border border-blue-800/40">
            Nexus Oracle System
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Terminal de Inteligência de Mercado
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
            Oracle Shield: <span className="font-bold">OPERATIONAL</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-gray-900 border border-border text-gray-300">
            Node: <span className="font-bold text-oracle-blue">ONLINE</span>
          </div>
        </div>
      </header>

      {/* Grid de Cards Superiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OracleScoreCard
          symbol="BTCUSDT"
          score={65}
          confidence={85}
          shieldStatus="SAFE"
          rationale="Alinhamento de médias móveis (SMA20/50/200) altista confirmado com volume comprador acima da média."
        />
        <RiskCalculatorCard />
      </div>

      {/* Tabela Inferior de Monitoramento */}
      <div>
        <AssetWatchlistTable />
      </div>
    </main>
  );
}
