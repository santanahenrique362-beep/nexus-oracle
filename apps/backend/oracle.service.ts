import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { calculateTrendScore } from './engines/trend.engine';
import { calculateVolumeScore } from './engines/volume.engine';
import { calculateMomentumScore } from './engines/momentum.engine';
import { calculateOracleScore } from './engines/oracle-score.engine';
import { calculateRisk, RiskParameters } from './engines/risk.engine';

@Injectable()
export class OracleService {
  constructor(private readonly prisma: PrismaService) {}

  async evaluateAsset(symbol: string) {
    // 1. Simulação dos dados técnicos de entrada
    const trendScore = calculateTrendScore({
      sma20: 64000,
      sma50: 62000,
      sma200: 55000,
      currentPrice: 63500,
    });

    const volumeScore = calculateVolumeScore({
      currentVolume: 1500,
      averageVolume20Period: 1000,
      isBuyerVolumePredominant: true,
    });

    const momentumScore = calculateMomentumScore({
      rsi14: 58,
      macdHistogram: 12.5,
    });

    // 2. Orquestração do Score Final e Confiança
    const oracleAnalysis = calculateOracleScore(
      trendScore,
      volumeScore,
      momentumScore,
    );

    // 3. Garantir que o ativo existe na tabela 'assets'
    await this.prisma.asset.upsert({
      where: { symbol },
      update: {},
      create: {
        symbol,
        name: symbol,
        isActive: true,
      },
    });

    // 4. Persistir a análise no histórico do banco de dados (OracleScoreHistory)
    await this.prisma.oracleScoreHistory.create({
      data: {
        assetSymbol: symbol,
        trendScore,
        volumeScore,
        momentumScore,
        finalScore: oracleAnalysis.score,
        confidence: oracleAnalysis.confidence,
        shieldStatus: oracleAnalysis.shieldStatus,
        rationale: oracleAnalysis.rationale,
      },
    });

    return {
      symbol,
      trendScore,
      volumeScore,
      momentumScore,
      ...oracleAnalysis,
    };
  }

  async calculateTradeRisk(params: RiskParameters) {
    return calculateRisk(params);
  }

  async getScoreHistory(symbol: string, limit = 20) {
    return this.prisma.oracleScoreHistory.findMany({
      where: { assetSymbol: symbol },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }
}
