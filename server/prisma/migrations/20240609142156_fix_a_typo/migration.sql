/*
  Warnings:

  - You are about to drop the column `verfication` on the `Allergy` table. All the data in the column will be lost.
  - You are about to drop the column `verfication` on the `MedicalProblem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Allergy" DROP COLUMN "verfication",
ADD COLUMN     "verification" TEXT;

-- AlterTable
ALTER TABLE "MedicalProblem" DROP COLUMN "verfication",
ADD COLUMN     "verification" TEXT;
