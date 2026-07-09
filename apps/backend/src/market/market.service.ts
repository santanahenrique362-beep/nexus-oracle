import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);
  // TTL do preço em tempo real no Redis (em segundos)
  private readonly TICKER_CACHE_TTL = 2;

  constructor(private readonly cacheService: CacheService) {}

  async getLiveTicker(symbol: string) {
    const formattedSymbol = symbol.toUpperCase().replace('/', '');
    const cacheKey = `market:ticker:${formattedSymbol}`;

    try {
      // 1. Tenta buscar o preço direto do Redis (Layer 2)
      const cachedData = await this.cacheService.get(cacheKey);

      if (cachedData) {
        this.logger.log(`[CACHE HIT] Retornando dados do Redis para: ${formattedSymbol}`);
        return JSON.parse(cachedData);
      }

      // 2. Cache Miss: Busca os dados reais na Binance
      this.logger.warn(`[CACHE MISS] Buscando cotação direta na Binance para: ${formattedSymbol}`);
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${formattedSymbol}`,
      );

      if (!response.ok) {
        throw new HttpException(
          'Ativo não encontrado na API de mercado',
          HttpStatus.NOT_FOUND,
        );
      }

      const data = await response.json();

      const normalizedData = {
        symbol: formattedSymbol,
        currentPrice: parseFloat(data.lastPrice),
        volume24h: parseFloat(data.volume),
        priceChangePercent: parseFloat(data.priceChangePercent),
        highPrice: parseFloat(data.highPrice),
        lowPrice: parseFloat(data.lowPrice),
        fetchedAt: new Date().toISOString(),
      };

      // 3. Persiste a cotação normalizada no Redis com TTL de 2s
      await this.cacheService.set(
        cacheKey,
        JSON.stringify(normalizedData),
        this.TICKER_CACHE_TTL,
      );

      return normalizedData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Erro ao conectar com a API de dados de mercado',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
