import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DecisionModule } from './decision/decision.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    // Registro global do orquestrador de tarefas assíncronas do NestJS
    ScheduleModule.forRoot(),
    
    // Módulos internos do ecossistema Nexus Oracle
    DecisionModule,
    MarketModule,
  ],
})
export class AppModule {}
