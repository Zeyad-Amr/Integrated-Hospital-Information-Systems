-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_creatorId_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
