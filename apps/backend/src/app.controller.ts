import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      system: 'Nexus Oracle Backend',
      timestamp: new Date().toISOString(),
    };
  }
}
