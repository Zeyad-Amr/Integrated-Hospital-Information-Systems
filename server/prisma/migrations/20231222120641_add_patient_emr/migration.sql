/*
  Warnings:

  - You are about to drop the column `personID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `kinship` on the `Visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Triage" AS ENUM ('STANDARD', 'IMMEDIATE', 'CRITICAL', 'URGENT');

-- CreateEnum
CREATE TYPE "ConsciousnessLevel" AS ENUM ('ALERT', 'VERBAL_RESPONSIVE', 'PAIN_RESPONSIVE', 'UNRESPONSIVE');

-- CreateEnum
CREATE TYPE "Comorbidity" AS ENUM ('HYPERTENSION', 'DIABETES', 'CARDIOVASCULAR_DISEASE', 'OBESITY', 'CHRONIC_RESPIRATORY_CONDITION', 'IMMUNODEFICIENCY_DISORDER', 'CHRONIC_KIDNEY_DISEASE', 'LIVER_DISEASE', 'CANCER', 'AUTOIMMUNE_DISORDER', 'NEUROLOGICAL_DISORDER', 'GASTROINTESTINAL_DISORDER', 'ENDOCRINE_DISORDER', 'PSYCHIATRIC_DISORDER', 'BONE_AND_JOINT_DISORDER', 'INFECTIOUS_DISEASE', 'HEMATOLOGICAL_DISORDER', 'METABOLIC_SYNDROME', 'SLEEP_APNEA', 'SUBSTANCE_USE_DISORDER');

-- DropForeignKey
ALTER TABLE "CompanionsOnIncidents" DROP CONSTRAINT "CompanionsOnIncidents_companionId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_personID_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_companionId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_patientId_fkey";

-- DropIndex
DROP INDEX "Employee_personID_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "personID",
ADD COLUMN     "personId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "kinship";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "comorbidities" "Comorbidity"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companion" (
    "id" TEXT NOT NULL,
    "kinship" "KinshipEnum",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Companion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL,
    "mainComplaint" TEXT,
    "consciousnessLevel" "ConsciousnessLevel",
    "triage" "Triage",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCode" TEXT NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vitals" (
    "id" TEXT NOT NULL,
    "temp" DOUBLE PRECISION,
    "PR" DOUBLE PRECISION,
    "RR" DOUBLE PRECISION,
    "painScore" DOUBLE PRECISION,
    "SBP" DOUBLE PRECISION,
    "DBP" DOUBLE PRECISION,
    "SpO2" DOUBLE PRECISION,
    "CVP" DOUBLE PRECISION,
    "GCS" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "medcalRecordId" TEXT NOT NULL,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCode" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_personId_key" ON "Patient"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Companion_personId_key" ON "Companion"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_visitCode_key" ON "MedicalRecord"("visitCode");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_personId_key" ON "Employee"("personId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Companion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionsOnIncidents" ADD CONSTRAINT "CompanionsOnIncidents_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Companion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_medcalRecordId_fkey" FOREIGN KEY ("medcalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
