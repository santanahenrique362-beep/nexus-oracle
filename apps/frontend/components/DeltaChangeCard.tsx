import React from 'react';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

interface DeltaChangeCardProps {
  deltaScore?: number;
  previousShield?: 'GREEN' | 'YELLOW' | 'RED';
  lastUpdated?: string;
}

export const DeltaChangeCard: React.FC<DeltaChangeCardProps> = ({
  deltaScore = 0,
  previousShield,
  lastUpdated = '10m atrás',
}) => {
  const isPositive = deltaScore > 0;
  const isNegative = deltaScore < 0;

  return (
    <div className="bg-[#11131A] border border-[#1E2230] rounded-xl p-4 flex items-center justify-between font-mono">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#090A0F] rounded-lg border border-[#1E2230] text-[#00B0FF]">
          <Clock size={18} />
        </div>
        <div>
          <span className="block text-[10px] text-[#78909C] uppercase tracking-wider">
            O QUE MUDOU (DELTA HISTÓRICO)
          </span>
          <span className="text-xs text-[#ECEFF1] font-semibold">
            Última atualização: {lastUpdated}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Score Shift */}
        <div className="flex items-center space-x-1.5">
          {isPositive && <TrendingUp size={16} className="text-[#00E676]" />}
          {isNegative && <TrendingDown size={16} className="text-[#FF1744]" />}
          {!isPositive && !isNegative && <Minus size={16} className="text-[#78909C]" />}
          
          <span
            className={`text-sm font-bold ${
              isPositive ? 'text-[#00E676]' : isNegative ? 'text-[#FF1744]' : 'text-[#78909C]'
            }`}
          >
            {isPositive ? `+${deltaScore}` : deltaScore} pts
          </span>
        </div>

        {/* Shield State Shift */}
        {previousShield && (
          <div className="hidden sm:flex items-center space-x-2 text-xs bg-[#090A0F] px-3 py-1 rounded border border-[#1E2230]">
            <span className="text-[#78909C]">Shield Anterior:</span>
            <span className="font-bold text-[#ECEFF1]">{previousShield}</span>
          </div>
        )}
      </div>
    </div>
  );
};
