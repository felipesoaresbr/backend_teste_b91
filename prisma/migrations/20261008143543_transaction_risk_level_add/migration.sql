-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('baixo', 'medio', 'alto');

-- AlterTable
ALTER TABLE "transacao" ADD COLUMN     "riskLevel" "RiskLevel" NOT NULL DEFAULT 'baixo';
