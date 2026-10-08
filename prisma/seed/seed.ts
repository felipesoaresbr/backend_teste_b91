import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client.js';
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const mcc = await prisma.mcc.create({
    data: {
      mcc: 5800,
      description: 'Casas de apostas esportivas',
    },
  });

  const client = await prisma.client.create({
    data: {
      legalName: 'Betano',
      document: '20.000.000/0001-20',
      mcc_id: mcc.id,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      client_id: client.id,
      amount: 240.0,
      transactionMethod: 'credito',
      installment: 2,
      tax: 0.02,
      liquidAmount: 244.8,
      status: 'aprovada',
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
