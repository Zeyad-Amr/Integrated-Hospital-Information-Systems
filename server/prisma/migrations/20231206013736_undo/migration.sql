/*
  Warnings:

  - A unique constraint covering the columns `[SSN]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Made the column `SSN` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "SSN" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_SSN_key" ON "Person"("SSN");
