import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientService } from '../client/client.service.js';
import { $Enums } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  getBrasiliaDate,
  getFiveMinutesAgoDate,
} from '../utils/getBrasiliaDate.js';
import { getLiquidAmountAndTax } from '../utils/getLiquidAmount.js';
import { CreateTransactionDto } from './dtos/create-transaction.dto.js';

const highRiskMcc = [5800];

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: ClientService,
  ) {}

  async findById(id: string) {
    const transaction_id = Number(id);

    if (!id) {
      throw new BadRequestException({
        message: 'Necessário informar o ID do transactione',
      });
    }

    if (!Number.isInteger(transaction_id) || transaction_id < 0) {
      throw new BadRequestException({ message: 'O ID informado é inválido' });
    }

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transaction_id,
      },
      include: {
        client: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException({ message: 'Transação não existente' });
    }

    return transaction;
  }

  async findAllTransactions() {
    const transactions = await this.prisma.transaction.findMany();
    return transactions;
  }

  async findTransactionsByHour(clientId: number) {
    const fiveMinutesAgoDate = getFiveMinutesAgoDate();

    const transactions = await this.prisma.transaction.findMany({
      where: {
        client_id: clientId,
        AND: [{ date: { gte: fiveMinutesAgoDate } }],
      },
    });

    return transactions.length;
  }

  async create(data: CreateTransactionDto) {
    const client = await this.clientService.findById(data.client_id);

    if (!client) {
      throw new BadRequestException('Cliente não localizado');
    }

    let liquidAmount = 0;
    let tax = 0;

    if (data.transactionMethod === 'credito') {
      const object = getLiquidAmountAndTax(data.amount, data.installment);
      liquidAmount = object.liquidAmount;
      tax = object.tax;
    } else {
      liquidAmount = data.amount;
    }

    let riskLevel: $Enums.RiskLevel = 'nenhum';

    if (client.mcc.mcc in highRiskMcc) {
      riskLevel = 'medio';
    }

    if (data.amount > 10000.0) {
      riskLevel = 'alto';
    }

    const currentHour = getBrasiliaDate().getUTCDate();

    if (currentHour >= 0 && currentHour <= 5) {
      riskLevel = 'baixo';
    }

    const fiveMinutesTransactions = await this.findTransactionsByHour(
      client.id,
    );

    if (fiveMinutesTransactions >= 5) {
      riskLevel = 'medio';
    }

    return this.prisma.transaction.create({
      data: {
        tax: tax,
        liquidAmount: liquidAmount,
        riskLevel: riskLevel,
        client_id: client.id,
        transactionMethod: data.transactionMethod,
        amount: data.amount,
        installment: data.installment,
        status: data.status,
      },
    });
  }
}
