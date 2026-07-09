'use client';

import React, { useState } from 'react';
import { CockpitHeader } from '../components/CockpitHeader';
import { OracleScoreGauge } from '../components/OracleScoreGauge';
import { DecisionBoard } from '../components/DecisionBoard';

export default function Home() {
  const [asset, setAsset] = useState('BTCUSDT');

  // Estado simulação do Payload Oficial retornado pelo Decision Engine (Layer 5)
  const [data] = useState({
    asset: 'BTCUSDT',
    oracleScore: 91,
    confidence: 88,
    shield: 'GREEN' as const,
    marketState: 'TRENDING' as const,
    trend: 92,
    volume: 84,
    momentum: 89,
    liquidity: 94,
    volatility: 41,
    risk: 'LOW' as const,
    strengths: [
      'Volume e fluxo comprador consistente acima da média',
      'Liquidez profunda no livro de ordens institucional',
      'Estrutura de tendência compradora mantida em tempos gráficos maiores'
    ],
    warnings: [
      'Taxa de Funding em níveis levemente elevados',
      'Proximidade de zona de resistência psicológica em $100k'
    ],
    recommendation: 'Condições favoráveis para alocação com viés comprador. Manter stop sob a estrutura de suporte local.',
  });

  return (
    <main className="min-h-screen bg-[#090A0F] text-[#ECEFF1] flex flex-col font-mono selection:bg-[#00B0FF] selection:text-black">
      {/* 1. Global Header */}
      <CockpitHeader currentAsset={asset} onSearchAsset={(newAsset) => setAsset(newAsset)} />

      {/* 2. Cockpit Container */}
      <div className="flex-1 p-6 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Gauge & Shield (4 Cols) */}
        <div className="lg:col-span-4">
          <OracleScoreGauge
            score={data.oracleScore}
            confidence={data.confidence}
            shield={data.shield}
            asset={asset}
          />
        </div>

        {/* Coluna Direita: Decision Board (8 Cols) */}
        <div className="lg:col-span-8">
          <DecisionBoard
            strengths={data.strengths}
            warnings={data.warnings}
            recommendation={data.recommendation}
            marketState={data.marketState}
            risk={data.risk}
          />
        </div>
      </div>
    </main>
  );
}
