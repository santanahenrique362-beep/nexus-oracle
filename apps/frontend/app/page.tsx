'use client';

import React, { useState } from 'react';
import { CockpitHeader } from '../components/CockpitHeader';
import { OracleScoreGauge } from '../components/OracleScoreGauge';
import { DecisionBoard } from '../components/DecisionBoard';
import { DeltaChangeCard } from '../components/DeltaChangeCard';
import { DecisionOutput } from '../../../packages/types';

export default function Home() {
  const [asset, setAsset] = useState('BTCUSDT');

  // Dados simulados respeitando o contrato oficial DecisionOutput
  const [data] = useState<DecisionOutput>({
    asset: 'BTCUSDT',
    oracleScore: 91,
    confidence: 100,
    shield: 'GREEN',
    marketState: 'TRENDING',
    trend: 92,
    volume: 84,
    momentum: 89,
    liquidity: 94,
    volatility: 41,
    correlation: 50,
    narrative: 80,
    risk: 'LOW',
    strengths: [
      'Tendência de alta bem definida em múltiplos prazos',
      'Fluxo e volume institucional acima da média',
      'Alta liquidez no livro de ordens, minimizando slippage',
    ],
    warnings: [
      'Elevada volatilidade no curto prazo',
    ],
    recommendation: 'Condições favoráveis para alocação com viés comprador. Manter gerenciamento de risco.',
    deltaScore: 4,
    previousShield: 'GREEN',
  });

  return (
    <main className="min-h-screen bg-[#090A0F] text-[#ECEFF1] flex flex-col font-mono selection:bg-[#00B0FF] selection:text-black">
      {/* 1. Global Header */}
      <CockpitHeader currentAsset={asset} onSearchAsset={(newAsset) => setAsset(newAsset)} />

      {/* 2. Cockpit Container */}
      <div className="flex-1 p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Delta Histórico (O que mudou) */}
        <DeltaChangeCard
          deltaScore={data.deltaScore}
          previousShield={data.previousShield}
          lastUpdated="há 5 minutos"
        />

        {/* Core Cockpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
      </div>
    </main>
  );
}
