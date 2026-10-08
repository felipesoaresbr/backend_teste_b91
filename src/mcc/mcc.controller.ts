import { Controller } from '@nestjs/common';
import { MccService } from './mcc.service.js';

@Controller('mcc')
export class MccController {
  constructor(private readonly mccService: MccService) {}
}
