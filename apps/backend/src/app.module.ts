import { Module } from '@nestjs/common';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';
import { PrismaModule } from './database/prisma.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [PrismaModule, MarketModule],
  controllers: [OracleController],
  providers: [OracleService],
})
export class AppModule {}
