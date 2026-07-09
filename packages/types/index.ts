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

export type ShieldStatus = 'GREEN' | 'YELLOW' | 'RED';
export type MarketState = 'TRENDING' | 'RANGING' | 'VOLATILE' | 'ILLIQUID';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface DecisionOutput {
  asset: string;
  oracleScore: number;
  confidence: number;
  shield: ShieldStatus;
  marketState: MarketState;
  trend: number;
  volume: number;
  momentum: number;
  liquidity: number;
  volatility: number;
  correlation: number;
  narrative: number;
  risk: RiskLevel;
  strengths: string[];
  warnings: string[];
  recommendation: string;
  // Delta Histórico (O que mudou desde o último snapshot)
  deltaScore?: number;
  previousShield?: ShieldStatus;
}
