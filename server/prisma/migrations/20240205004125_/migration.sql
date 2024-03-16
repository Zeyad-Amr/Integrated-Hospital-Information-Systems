/*
  Warnings:

  - Added the required column `name` to the `SubDepartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubDepartment" ADD COLUMN     "name" TEXT NOT NULL;
