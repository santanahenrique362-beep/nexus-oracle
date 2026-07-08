import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';

@Module({
  imports: [],
  controllers: [AppController, OracleController],
  providers: [OracleService],
})
export class AppModule {}
