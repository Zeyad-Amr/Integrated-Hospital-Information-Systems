/*
  Warnings:

  - The `kinship` column on the `Visit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Kinship" AS ENUM ('BROTHER', 'SISTER', 'FATHER', 'MOTHER', 'COUSIN', 'AUNT', 'OTHER');

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "kinship",
ADD COLUMN     "kinship" "Kinship";
