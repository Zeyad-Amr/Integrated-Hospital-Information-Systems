/*
  Warnings:

  - The `kinship` column on the `Visit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `verificationMethod` on the `Person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IdentityEnum" AS ENUM ('NATIONALIDCARD', 'PASSPORT');

-- CreateEnum
CREATE TYPE "KinshipEnum" AS ENUM ('BROTHER', 'SISTER', 'FATHER', 'MOTHER', 'COUSIN', 'AUNT', 'OTHER');

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "verificationMethod",
ADD COLUMN     "verificationMethod" "IdentityEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "kinship",
ADD COLUMN     "kinship" "KinshipEnum";

-- DropEnum
DROP TYPE "Identity";

-- DropEnum
DROP TYPE "Kinship";
