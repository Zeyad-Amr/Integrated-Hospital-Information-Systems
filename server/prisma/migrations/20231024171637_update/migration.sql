/*
  Warnings:

  - You are about to drop the column `notes` on the `Visit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "notes",
ALTER COLUMN "code" DROP NOT NULL;
