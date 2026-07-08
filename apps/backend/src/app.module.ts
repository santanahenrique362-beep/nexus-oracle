import { Module } from '@nestjs/common';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OracleController],
  providers: [OracleService],
})
export class AppModule {}
