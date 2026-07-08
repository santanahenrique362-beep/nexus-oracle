import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private redisClient: Redis;

  onModuleInit() {
    // Configuração inicial apontando para o localhost (padrão de desenvolvimento da Fase 1)
    // Em produção, essa string virá de variáveis de ambiente (.env)
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    
    this.logger.log(`Inicializando conexão com o Redis em: ${redisUrl}`);
    this.redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
    });

    this.redisClient.on('error', (error) => {
      this.logger.error('Falha crítica na conexão com o Redis:', error);
    });
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      this.logger.warn(`Erro ao ler chave [${key}] do Redis. Aplicando Fallback.`, error);
      return null; // Fallback tolerante a falhas para não quebrar a requisição
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.redisClient.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.redisClient.set(key, value);
      }
    } catch (error) {
      this.logger.warn(`Erro ao gravar chave [${key}] no Redis.`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.logger.warn(`Erro ao deletar chave [${key}] no Redis.`, error);
    }
  }

  onModuleDestroy() {
    this.logger.log('Encerrando conexão com o Redis...');
    this.redisClient.disconnect();
  }
}
