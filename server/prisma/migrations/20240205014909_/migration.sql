/*
  Warnings:

  - The primary key for the `Permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id");
