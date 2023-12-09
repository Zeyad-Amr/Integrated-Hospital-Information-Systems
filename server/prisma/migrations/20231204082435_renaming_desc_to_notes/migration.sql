/*
  Warnings:

  - You are about to drop the column `description` on the `Incident` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "description",
ADD COLUMN     "notes" TEXT;
