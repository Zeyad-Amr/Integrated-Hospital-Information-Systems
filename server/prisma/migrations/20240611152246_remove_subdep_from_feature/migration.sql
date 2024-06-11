/*
  Warnings:

  - You are about to drop the column `subDepartmentId` on the `Feature` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_subDepartmentId_fkey";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "subDepartmentId";
