/*
  Warnings:

  - Added the required column `createdAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftEnd` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftStart` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shiftEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "shiftStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
