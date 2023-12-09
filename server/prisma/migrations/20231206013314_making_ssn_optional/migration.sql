-- DropIndex
DROP INDEX "Person_SSN_key";

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "SSN" DROP NOT NULL;
