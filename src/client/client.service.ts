import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const client_id = Number(id);

    if (!id) {
      throw new BadRequestException({
        message: 'Necessário informar o ID do cliente',
      });
    }

    if (!Number.isInteger(client_id) || client_id < 0) {
      throw new BadRequestException({ message: 'O ID informado é inválido' });
    }

    const client = await this.prisma.client.findUnique({
      where: {
        id: client_id,
      },
      include: {
        mcc: true,
      },
    });

    if (!client) {
      throw new NotFoundException({ message: 'Cliente não existente' });
    }

    return client;
  }

  async create() {}
}
