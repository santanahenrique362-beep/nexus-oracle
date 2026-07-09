export interface DecisionInput {
  asset: string;
  trend: number;
  volume: number;
  momentum: number;
  liquidity?: number;
  volatility?: number;
  correlation?: number;
  narrative?: number;
}

export interface DecisionOutput {
  asset: string;
  oracleScore: number;
  confidence: number;
  shield: 'GREEN' | 'YELLOW' | 'RED';
  marketState: 'TRENDING' | 'RANGING' | 'VOLATILE' | 'ILLIQUID';
  trend: number;
  volume: number;
  momentum: number;
  liquidity: number;
  volatility: number;
  correlation: number;
  narrative: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  strengths: string[];
  warnings: string[];
  recommendation: string;
}

export function evaluateDecision(input: DecisionInput): DecisionOutput {
  const liquidity = input.liquidity ?? 85;
  const volatility = input.volatility ?? 40;
  const correlation = input.correlation ?? 75;
  const narrative = input.narrative ?? 80;

  const rawScore = Math.round(
    input.trend * 0.30 +
    input.volume * 0.25 +
    input.momentum * 0.25 +
    liquidity * 0.10 +
    narrative * 0.10
  );

  const scoreSpread = Math.max(input.trend, input.volume, input.momentum) - 
                      Math.min(input.trend, input.volume, input.momentum);
  const confidence = Math.max(50, Math.min(99, 100 - scoreSpread));

  let shield: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
  let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';

  if (volatility > 75 || liquidity < 40) {
    shield = 'RED';
    risk = 'CRITICAL';
  } else if (volatility > 55 || rawScore < 50) {
    shield = 'YELLOW';
    risk = 'MEDIUM';
  }

  let marketState: 'TRENDING' | 'RANGING' | 'VOLATILE' | 'ILLIQUID' = 'RANGING';
  if (volatility > 70) {
    marketState = 'VOLATILE';
  } else if (liquidity < 40) {
    marketState = 'ILLIQUID';
  } else if (input.trend > 65) {
    marketState = 'TRENDING';
  }

  const strengths: string[] = [];
  const warnings: string[] = [];

  if (input.volume > 75) strengths.push('Volume e fluxo comprador consistente');
  if (liquidity > 80) strengths.push('Alta liquidez no livro de ordens');
  if (input.trend > 80) strengths.push('Estrutura de tendência compradora sólida');

  if (volatility > 60) warnings.push('Elevada volatilidade de curto prazo');
  if (input.momentum < 45) warnings.push('Momentum de preço desacelerando');

  let recommendation = 'Aguardar definição de estrutura clara.';
  if (shield === 'GREEN' && rawScore >= 80) {
    recommendation = 'Condições favoráveis para alocação com viés comprador.';
  } else if (shield === 'YELLOW') {
    recommendation = 'Mercado requer cautela; reduzir dimensão das posições.';
  } else if (shield === 'RED') {
    recommendation = 'Risco elevado. Evitar novas entradas operacionais.';
  }

  return {
    asset: input.asset,
    oracleScore: rawScore,
    confidence,
    shield,
    marketState,
    trend: input.trend,
    volume: input.volume,
    momentum: input.momentum,
    liquidity,
    volatility,
    correlation,
    narrative,
    risk,
    strengths: strengths.length ? strengths : ['Condições dentro da média'],
    warnings: warnings.length ? warnings : ['Nenhum alerta crítico no momento'],
    recommendation,
  };
}
