/*
  Warnings:

  - You are about to drop the column `shiftEnd` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `shiftStart` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_creatorId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "shiftEnd",
DROP COLUMN "shiftStart";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "creatorId" DROP NOT NULL;
