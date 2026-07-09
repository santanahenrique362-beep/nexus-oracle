import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface OracleScoreGaugeProps {
  score: number;
  confidence: number;
  shield: 'GREEN' | 'YELLOW' | 'RED';
  asset: string;
}

export const OracleScoreGauge: React.FC<OracleScoreGaugeProps> = ({
  score,
  confidence,
  shield,
  asset,
}) => {
  // Mapeamento dinâmico do Escudo
  const shieldColors = {
    GREEN: {
      border: 'border-[#00E676]',
      text: 'text-[#00E676]',
      bg: 'bg-[#00E676]/10',
      label: 'SHIELD ACTIVE — LOW RISK',
      icon: ShieldCheck,
    },
    YELLOW: {
      border: 'border-[#FFD600]',
      text: 'text-[#FFD600]',
      bg: 'bg-[#FFD600]/10',
      label: 'CAUTION — MEDIUM RISK',
      icon: Shield,
    },
    RED: {
      border: 'border-[#FF1744]',
      text: 'text-[#FF1744]',
      bg: 'bg-[#FF1744]/10',
      label: 'VETO — CRITICAL RISK',
      icon: ShieldAlert,
    },
  };

  const currentShield = shieldColors[shield] || shieldColors.GREEN;
  const ShieldIcon = currentShield.icon;

  return (
    <div className={`relative bg-[#11131A] border-2 ${currentShield.border} rounded-xl p-6 shadow-2xl flex flex-col items-center justify-center transition-all duration-300`}>
      {/* Target Asset Title */}
      <span className="text-xs font-mono text-[#78909C] uppercase tracking-widest mb-1">
        ASSET ANALYSIS
      </span>
      <h2 className="text-2xl font-bold font-mono text-[#ECEFF1] tracking-wider mb-4">
        {asset}
      </h2>

      {/* Main Score Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#1E2230"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={shield === 'GREEN' ? '#00E676' : shield === 'YELLOW' ? '#FFD600' : '#FF1744'}
            strokeWidth="8"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * score) / 100}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Display */}
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black font-mono text-[#ECEFF1] tracking-tighter">
            {score}
          </span>
          <span className="text-[10px] font-mono text-[#78909C] uppercase">
            ORACLE SCORE
          </span>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="mt-4 flex items-center space-x-2 bg-[#090A0F] px-4 py-1.5 rounded-full border border-[#1E2230]">
        <span className="text-xs font-mono text-[#78909C]">CONFIDENCE:</span>
        <span className="text-xs font-mono font-bold text-[#00B0FF]">{confidence}%</span>
      </div>

      {/* Shield Banner */}
      <div className={`mt-4 w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg ${currentShield.bg} ${currentShield.text} border ${currentShield.border}`}>
        <ShieldIcon size={16} />
        <span className="text-xs font-mono font-bold tracking-wide">
          {currentShield.label}
        </span>
      </div>
    </div>
  );
};
