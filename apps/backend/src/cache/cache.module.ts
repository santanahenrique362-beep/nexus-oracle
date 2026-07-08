import { Module, Global } from '@nestjs/common';
import { CacheService } from './cache.service';

@Global() // Decorator global para facilitar o acesso sem precisar importar em múltiplos lugares
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
