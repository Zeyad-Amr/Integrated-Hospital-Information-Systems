/*
  Warnings:

  - You are about to drop the column `attendantID` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `attendantName` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `cameFrom` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `injuryCause` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `injuryLocation` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `attendantID` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `attendantName` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `cameFrom` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `injuryCause` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `injuryLocation` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Visit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_carId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_carId_fkey";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "attendantID",
DROP COLUMN "attendantName",
DROP COLUMN "cameFrom",
DROP COLUMN "carId",
DROP COLUMN "injuryCause",
DROP COLUMN "injuryLocation",
DROP COLUMN "notes",
ADD COLUMN     "additionalInfoId" TEXT;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "SSN" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "attendantID",
DROP COLUMN "attendantName",
DROP COLUMN "cameFrom",
DROP COLUMN "carId",
DROP COLUMN "injuryCause",
DROP COLUMN "injuryLocation",
DROP COLUMN "notes",
ADD COLUMN     "additionalInfoId" TEXT;

-- CreateTable
CREATE TABLE "Attendant" (
    "id" TEXT NOT NULL,
    "SSN" TEXT,
    "cardId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attendant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitAdditionalInformation" (
    "id" TEXT NOT NULL,
    "carId" TEXT,
    "cameFrom" "CameFromOptions",
    "injuryLocation" TEXT,
    "injuryCause" TEXT,
    "notes" TEXT,

    CONSTRAINT "VisitAdditionalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_SSN_key" ON "Attendant"("SSN");

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_cardId_key" ON "Attendant"("cardId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_additionalInfoId_fkey" FOREIGN KEY ("additionalInfoId") REFERENCES "VisitAdditionalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_additionalInfoId_fkey" FOREIGN KEY ("additionalInfoId") REFERENCES "VisitAdditionalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitAdditionalInformation" ADD CONSTRAINT "VisitAdditionalInformation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "CarNumber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
