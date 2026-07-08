import React from 'react';

interface OracleScoreProps {
  symbol: string;
  score: number;
  confidence: number;
  shieldStatus: 'SAFE' | 'WARNING' | 'SHIELD_ACTIVE';
  rationale: string;
}

export const OracleScoreCard: React.FC<OracleScoreProps> = ({
  symbol,
  score,
  confidence,
  shieldStatus,
  rationale,
}) => {
  const getScoreColor = (value: number) => {
    if (value > 30) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (value < -30) return 'text-rose-500 border-rose-500/30 bg-rose-950/20';
    return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
  };

  const getShieldBadge = (status: string) => {
    switch (status) {
      case 'SAFE':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">🛡️ SHIELD: SAFE</span>;
      case 'WARNING':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">⚠️ SHIELD: WARNING</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/50">🚨 SHIELD: ACTIVE</span>;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ativo Analisado</span>
          <h2 className="text-2xl font-black text-white">{symbol}</h2>
        </div>
        <div>{getShieldBadge(shieldStatus)}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border ${getScoreColor(score)} text-center`}>
          <p className="text-xs font-medium text-gray-400 uppercase">Oracle Score</p>
          <p className="text-3xl font-black mt-1">{score > 0 ? `+${score}` : score}</p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-gray-900/40 text-center">
          <p className="text-xs font-medium text-gray-400 uppercase">Índice de Confiança</p>
          <p className="text-3xl font-black text-oracle-blue mt-1">{confidence}%</p>
        </div>
      </div>

      <div className="bg-gray-900/60 p-3 rounded-lg border border-border/40 text-sm text-gray-300">
        <span className="font-semibold text-gray-200">Racional do Oráculo:</span> {rationale}
      </div>
    </div>
  );
};
