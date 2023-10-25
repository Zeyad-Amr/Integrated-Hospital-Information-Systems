/*
  Warnings:

  - Made the column `createdById` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_createdById_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
