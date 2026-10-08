import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto.js';
import { TransactionService } from './transaction.service.js';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('new')
  async create(@Body() data: CreateTransactionDto) {
    return await this.transactionService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.transactionService.findById(id);
  }

  @Get('/')
  async findAllTransactions() {
    return await this.transactionService.findAllTransactions();
  }
}
