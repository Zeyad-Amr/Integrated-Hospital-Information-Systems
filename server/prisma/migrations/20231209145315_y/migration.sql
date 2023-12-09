/*
  Warnings:

  - Added the required column `attendantRole` to the `Attendant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttendantRole" AS ENUM ('PARAMEDIC', 'OFFICER');

-- AlterTable
ALTER TABLE "Attendant" ADD COLUMN     "attendantRole" "AttendantRole" NOT NULL;
