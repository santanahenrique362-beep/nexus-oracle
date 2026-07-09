import React from 'react';
import { ShieldCheck, Activity, Search } from 'lucide-react';

interface CockpitHeaderProps {
  currentAsset: string;
  onSearchAsset: (symbol: string) => void;
}

export const CockpitHeader: React.FC<CockpitHeaderProps> = ({
  currentAsset,
  onSearchAsset,
}) => {
  return (
    <header className="w-full bg-[#11131A] border-b border-[#1E2230] px-6 py-3 flex items-center justify-between">
      {/* Brand & Market Status */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#00E676] rounded-full animate-pulse" />
          <span className="font-bold tracking-wider text-lg text-[#ECEFF1] font-mono">
            NEXUS<span className="text-[#00B0FF]">.ORACLE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-[#090A0F] px-3 py-1 rounded border border-[#1E2230]">
          <Activity size={14} className="text-[#00E676]" />
          <span className="text-xs text-[#78909C] font-mono">SYSTEM: OPERATIONAL</span>
        </div>
      </div>

      {/* Global Asset Search */}
      <div className="relative w-64 md:w-80">
        <Search size={16} className="absolute left-3 top-2.5 text-[#78909C]" />
        <input
          type="text"
          placeholder="Buscar Ativo (ex: BTCUSDT)..."
          defaultValue={currentAsset}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchAsset((e.target as HTMLInputElement).value);
            }
          }}
          className="w-full bg-[#090A0F] border border-[#1E2230] text-[#ECEFF1] font-mono text-sm rounded pl-9 pr-4 py-1.5 focus:outline-none focus:border-[#00B0FF] transition-colors"
        />
      </div>

      {/* Security Status */}
      <div className="flex items-center space-x-2 text-xs font-mono text-[#00E676]">
        <ShieldCheck size={16} />
        <span className="hidden sm:inline">DECISION ENGINE V1.0</span>
      </div>
    </header>
  );
};
