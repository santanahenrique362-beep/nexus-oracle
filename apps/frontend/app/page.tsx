import React from 'react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl bg-card border border-border p-8 rounded-xl shadow-2xl">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-oracle-blue uppercase bg-blue-950/50 rounded-full border border-blue-800/40">
          Nexus Oracle System
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Terminal de Inteligência de Mercado
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Contextualização contextual contínua, gestão de risco algorítmica e análise de confluência temporal.
        </p>
        <div className="flex justify-center gap-4 text-sm font-medium">
          <div className="px-4 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
            Oracle Shield: <span className="font-bold">SAFE</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-gray-800/50 border border-border text-gray-300">
            Status: <span className="font-bold text-oracle-blue">MONOREPO READY</span>
          </div>
        </div>
      </div>
    </main>
  );
}
