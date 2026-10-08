-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('aprovada', 'recusada', 'cancelada');

-- CreateTable
CREATE TABLE "mcc" (
    "id" SERIAL NOT NULL,
    "mcc" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "mcc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "mcc_id" INTEGER NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "parcela" INTEGER NOT NULL,
    "taxa" DECIMAL(65,30) NOT NULL,
    "valor_liquido" DECIMAL(65,30) NOT NULL,
    "status" "TransactionStatus" NOT NULL,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_mcc_id_fkey" FOREIGN KEY ("mcc_id") REFERENCES "mcc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
