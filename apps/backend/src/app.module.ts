import { Module } from '@nestjs/common';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';
import { PrismaModule } from './database/prisma.module';
import { MarketModule } from './market/market.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [PrismaModule, MarketModule, CacheModule],
  controllers: [OracleController],
  providers: [OracleService],
})
export class AppModule {}
