import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service.js';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.clientService.findById(id);
  }
}
