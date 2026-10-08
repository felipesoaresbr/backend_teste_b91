import { Module } from '@nestjs/common';
import { ClientService } from '../client/client.service.js';
import { TransactionController } from './transaction.controller.js';
import { TransactionService } from './transaction.service.js';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, ClientService],
})
export class TransactionModule {}
