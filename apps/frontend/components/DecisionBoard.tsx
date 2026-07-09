import React from 'react';
import { CheckCircle2, AlertTriangle, Compass, Zap } from 'lucide-react';

interface DecisionBoardProps {
  strengths: string[];
  warnings: string[];
  recommendation: string;
  marketState: 'TRENDING' | 'RANGING' | 'VOLATILE' | 'ILLIQUID';
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export const DecisionBoard: React.FC<DecisionBoardProps> = ({
  strengths,
  warnings,
  recommendation,
  marketState,
  risk,
}) => {
  return (
    <div className="bg-[#11131A] border border-[#1E2230] rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-6 h-full">
      {/* Header com Estado de Mercado e Risco */}
      <div className="flex items-center justify-between border-b border-[#1E2230] pb-4">
        <div className="flex items-center space-x-2">
          <Zap size={18} className="text-[#00B0FF]" />
          <span className="font-mono text-sm font-bold text-[#ECEFF1]">
            DECISION ENGINE SYNTHESIS
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-[#78909C] bg-[#090A0F] px-2.5 py-1 rounded border border-[#1E2230]">
            STATE: <strong className="text-[#ECEFF1]">{marketState}</strong>
          </span>
          <span className="text-xs font-mono text-[#78909C] bg-[#090A0F] px-2.5 py-1 rounded border border-[#1E2230]">
            RISK: <strong className={risk === 'LOW' ? 'text-[#00E676]' : risk === 'CRITICAL' ? 'text-[#FF1744]' : 'text-[#FFD600]'}>{risk}</strong>
          </span>
        </div>
      </div>

      {/* Grid de Strengths & Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pontos Fortes */}
        <div className="bg-[#090A0F] border border-[#1E2230] rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3 text-[#00E676]">
            <CheckCircle2 size={16} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              STRENGTHS (PONTOS FORTES)
            </span>
          </div>
          <ul className="space-y-2">
            {strengths.map((item, index) => (
              <li key={index} className="text-xs font-mono text-[#ECEFF1] flex items-start space-x-2">
                <span className="text-[#00E676] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Alertas & Vulnerabilidades */}
        <div className="bg-[#090A0F] border border-[#1E2230] rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3 text-[#FFD600]">
            <AlertTriangle size={16} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              WARNINGS (ALERTAS / DIVERGÊNCIAS)
            </span>
          </div>
          <ul className="space-y-2">
            {warnings.map((item, index) => (
              <li key={index} className="text-xs font-mono text-[#ECEFF1] flex items-start space-x-2">
                <span className="text-[#FFD600] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Caixa de Recomendação Institucional */}
      <div className="bg-[#090A0F] border-l-4 border-l-[#00B0FF] border border-[#1E2230] rounded-r-lg p-4 flex items-start space-x-3">
        <Compass size={20} className="text-[#00B0FF] mt-0.5 flex-shrink-0" />
        <div>
          <span className="block text-[10px] font-mono text-[#78909C] uppercase tracking-widest mb-1">
            EXECUTIVE RECOMMENDATION
          </span>
          <p className="text-sm font-mono font-semibold text-[#ECEFF1] leading-relaxed">
            "{recommendation}"
          </p>
        </div>
      </div>
    </div>
  );
};
