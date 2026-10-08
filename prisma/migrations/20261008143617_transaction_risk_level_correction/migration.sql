/*
  Warnings:

  - You are about to drop the column `riskLevel` on the `transacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transacao" DROP COLUMN "riskLevel",
ADD COLUMN     "nivel_risco" "RiskLevel" NOT NULL DEFAULT 'baixo';
