import React from 'react';

interface AssetOverview {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  oracleScore: number;
  shieldStatus: 'SAFE' | 'WARNING' | 'SHIELD_ACTIVE';
}

const mockAssets: AssetOverview[] = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', price: 63500, change24h: 2.4, oracleScore: 65, shieldStatus: 'SAFE' },
  { symbol: 'ETHUSDT', name: 'Ethereum', price: 3450, change24h: -1.2, oracleScore: -15, shieldStatus: 'WARNING' },
  { symbol: 'SOLUSDT', name: 'Solana', price: 145, change24h: 5.8, oracleScore: 82, shieldStatus: 'SAFE' },
  { symbol: 'AVAXUSDT', name: 'Avalanche', price: 28, change24h: -6.5, oracleScore: -58, shieldStatus: 'SHIELD_ACTIVE' },
];

export const AssetWatchlistTable: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-xl space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📊 Monitoramento de Mercado em Tempo Real
        </h2>
        <p className="text-xs text-gray-400">
          Pontuação dinâmica e status de proteção por ativo.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50 border-b border-border">
            <tr>
              <th className="px-4 py-3">Ativo</th>
              <th className="px-4 py-3 text-right">Preço</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-center">Oracle Score</th>
              <th className="px-4 py-3 text-center">Shield Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {mockAssets.map((asset) => (
              <tr key={asset.symbol} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3 font-semibold text-white">
                  {asset.symbol} <span className="text-xs text-gray-400 font-normal">({asset.name})</span>
                </td>
                <td className="px-4 py-3 text-right font-mono">${asset.price.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-semibold font-mono ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {asset.change24h >= 0 ? `+${asset.change24h}%` : `${asset.change24h}%`}
                </td>
                <td className="px-4 py-3 text-center font-bold font-mono">
                  <span className={`px-2.5 py-1 rounded-md text-xs ${
                    asset.oracleScore > 30 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' 
                      : asset.oracleScore < -30 
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/40' 
                        : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                  }`}>
                    {asset.oracleScore > 0 ? `+${asset.oracleScore}` : asset.oracleScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs font-semibold">
                  {asset.shieldStatus === 'SAFE' && <span className="text-emerald-400">🟢 SAFE</span>}
                  {asset.shieldStatus === 'WARNING' && <span className="text-amber-400">🟡 WARNING</span>}
                  {asset.shieldStatus === 'SHIELD_ACTIVE' && <span className="text-rose-400 font-bold">🔴 SHIELD</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
