'use client';

import React, { useState } from 'react';

export const RiskCalculatorCard: React.FC = () => {
  const [capital, setCapital] = useState<number>(10000);
  const [riskPct, setRiskPct] = useState<number>(1.0);
  const [entryPrice, setEntryPrice] = useState<number>(63500);
  const [stopLoss, setStopLoss] = useState<number>(62000);

  const priceRisk = Math.abs(entryPrice - stopLoss);
  const riskAmountUsd = capital * (riskPct / 100);
  const positionSize = priceRisk > 0 ? (riskAmountUsd / priceRisk).toFixed(4) : '0';

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xl space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🧮 Calculadora de Dimensionamento de Risco
        </h2>
        <p className="text-xs text-gray-400">
          Ajuste os parâmetros para obter o tamanho exato da posição.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Capital da Conta (USD)
          </label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full bg-gray-900 border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-oracle-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Risco por Trade (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={riskPct}
            onChange={(e) => setRiskPct(Number(e.target.value))}
            className="w-full bg-gray-900 border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-oracle-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Preço de Entrada (USD)
          </label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            className="w-full bg-gray-900 border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-oracle-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Stop Loss (USD)
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-gray-900 border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-oracle-blue"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-border/60 grid grid-cols-2 gap-4">
        <div className="bg-gray-900/60 p-3 rounded-lg border border-border/40">
          <span className="text-xs text-gray-400 block">Risco Máximo Em dólares</span>
          <span className="text-lg font-bold text-rose-400">${riskAmountUsd.toFixed(2)}</span>
        </div>
        <div className="bg-gray-900/60 p-3 rounded-lg border border-border/40">
          <span className="text-xs text-gray-400 block">Tamanho da Posição</span>
          <span className="text-lg font-bold text-emerald-400">{positionSize} Unidades</span>
        </div>
      </div>
    </div>
  );
};
