import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MarketService {
  // Vamos buscar os dados reais do ativo diretamente da API pública
  async getLiveTicker(symbol: string) {
    try {
      // Formatando o símbolo para o padrão da Binance (ex: BTCUSDT)
      const formattedSymbol = symbol.toUpperCase().replace('/', '');
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${formattedSymbol}`);
      
      if (!response.ok) {
        throw new HttpException('Ativo não encontrado na API de mercado', HttpStatus.NOT_FOUND);
      }

      const data = await response.json();

      return {
        symbol: formattedSymbol,
        currentPrice: parseFloat(data.lastPrice),
        volume24h: parseFloat(data.volume),
        priceChangePercent: parseFloat(data.priceChangePercent),
        highPrice: parseFloat(data.highPrice),
        lowPrice: parseFloat(data.lowPrice),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao conectar com a API de dados de mercado',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
