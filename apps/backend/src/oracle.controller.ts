import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { OracleService } from './oracle.service';
import { RiskParameters } from './engines/risk.engine';

@Controller('oracle')
export class OracleController {
  constructor(private readonly oracleService: OracleService) {}

  @Get('evaluate/:symbol')
  async evaluateAsset(@Param('symbol') symbol: string) {
    return this.oracleService.evaluateAsset(symbol.toUpperCase());
  }

  @Post('risk')
  async calculateRisk(@Body() params: RiskParameters) {
    return this.oracleService.calculateTradeRisk(params);
  }

  @Get('history/:symbol')
  async getHistory(
    @Param('symbol') symbol: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return this.oracleService.getScoreHistory(symbol.toUpperCase(), parsedLimit);
  }
}
