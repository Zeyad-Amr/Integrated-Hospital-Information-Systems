/*
  Warnings:

  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Incident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `Visit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'RECEPTIONIST', 'DOCTOR', 'NURSE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" "RoleEnum" NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "creatorId" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
