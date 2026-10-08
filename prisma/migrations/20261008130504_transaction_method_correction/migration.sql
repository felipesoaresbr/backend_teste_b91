/*
  Warnings:

  - You are about to drop the column `transaction_method` on the `transacao` table. All the data in the column will be lost.
  - Added the required column `tipo_transacao` to the `transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transacao" DROP COLUMN "transaction_method",
ADD COLUMN     "tipo_transacao" "TransactionMethods" NOT NULL;
