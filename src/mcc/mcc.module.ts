import { Module } from '@nestjs/common';
import { MccController } from './mcc.controller.js';
import { MccService } from './mcc.service.js';

@Module({
  controllers: [MccController],
  providers: [MccService],
})
export class MccModule {}
