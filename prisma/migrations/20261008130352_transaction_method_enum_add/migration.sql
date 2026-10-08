/*
  Warnings:

  - Added the required column `transaction_method` to the `transacao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionMethods" AS ENUM ('credito', 'debito');

-- AlterTable
ALTER TABLE "transacao" ADD COLUMN     "transaction_method" "TransactionMethods" NOT NULL;
