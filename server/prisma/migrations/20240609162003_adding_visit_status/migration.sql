-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('CREATED', 'BOOKED', 'ARRIVED', 'TRANSFERED', 'EXAMINED', 'ENDED');

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "status" "VisitStatus" NOT NULL DEFAULT 'CREATED';
