/*
  Warnings:

  - Made the column `creatorId` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_creatorId_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "creatorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
