/*
  Warnings:

  - Changed the type of `type` on the `Person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('PATIENT', 'COMPANION', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "type",
ADD COLUMN     "type" "PersonType" NOT NULL;
