import { IsDecimal, IsInt, IsString } from 'class-validator';

enum Status {
  aprovada = 'aprovada',
  recusada = 'recusada',
  cancelada = 'cancelada',
}

enum TransactionMethods {
  credito = 'credito',
  debito = 'debito',
}

export class CreateTransactionDto {
  @IsString()
  client_id: string;

  @IsDecimal()
  amount: number;

  @IsInt()
  installment: number;

  @IsString()
  transactionMethod: TransactionMethods;

  @IsString()
  status: Status;
}
