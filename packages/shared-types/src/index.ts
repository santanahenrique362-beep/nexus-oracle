export type ShieldStatus = 'SAFE' | 'WARNING' | 'SHIELD_ACTIVE';

export type TradeSide = 'LONG' | 'SHORT';

export interface OracleScoreBreakdown {
  trend: number;
  volume: number;
  momentum: number;
  liquidity: number;
  narrative: number;
  correlation: number;
}

export interface OracleScoreSnapshot {
  symbol: string;
  oracleScore: number;
  confidenceIndex: number;
  shieldStatus: ShieldStatus;
  breakdown: OracleScoreBreakdown;
  rationale: string;
  timestamp: string;
}

export interface RiskCalculationInput {
  accountCapital: number;
  riskPerTradePct: number;
  entryPrice: number;
  stopLoss: number;
}

export interface RiskCalculationOutput {
  riskAmountUsd: number;
  positionSize: number;
  status: 'APPROVED' | 'REJECTED';
  message: string;
}
