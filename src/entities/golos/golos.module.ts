import { Module } from '@nestjs/common';
import { GolosService } from './golos.service';
import { GolosController } from './golos.controller';

@Module({
  providers: [GolosService],
  controllers: [GolosController]
})
export class GolosModule {}
