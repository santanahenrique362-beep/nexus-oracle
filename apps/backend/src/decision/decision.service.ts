import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { MarketService } from './market/market.service';
import { calculateTrendScore } from './engines/trend.engine';
import { calculateVolumeScore } from './engines/volume.engine';
import { calculateMomentumScore } from './engines/momentum.engine';
import { DecisionService } from './decision/decision.service';

@Injectable()
export class OracleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly marketService: MarketService,
    private readonly decisionService: DecisionService,
  ) {}

  async evaluateAsset(symbol: string) {
    const marketData = await this.marketService.getLiveTicker(symbol);

    const currentPrice = marketData.currentPrice;
    const priceChange = marketData.priceChangePercent;

    const trendScore = calculateTrendScore(currentPrice, priceChange);
    const volumeScore = calculateVolumeScore(marketData.volume24h);
    const momentumScore = calculateMomentumScore(priceChange);

    const decisionOutput = this.decisionService.consolidateDecision({
      asset: marketData.symbol,
      trend: trendScore,
      volume: volumeScore,
      momentum: momentumScore,
    });

    await this.prisma.oracleScoreHistory.create({
      data: {
        symbol: decisionOutput.asset,
        oracleScore: decisionOutput.oracleScore,
        trendScore: decisionOutput.trend,
        volumeScore: decisionOutput.volume,
        momentumScore: decisionOutput.momentum,
        riskLevel: decisionOutput.risk,
      },
    });

    return decisionOutput;
  }
}
