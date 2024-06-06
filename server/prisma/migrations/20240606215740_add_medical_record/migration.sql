/*
  Warnings:

  - You are about to drop the column `medcalRecordId` on the `Vitals` table. All the data in the column will be lost.
  - You are about to drop the column `painScore` on the `Vitals` table. All the data in the column will be lost.
  - You are about to drop the `MedicalRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ComorbidityToPatient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Vitals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Vitals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitCode` to the `Vitals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsultationReason" AS ENUM ('OPINION_RECOMMENDATION_ONLY', 'CO_MANAGEMENT', 'TRANSFER_FOR_MANAGEMENT');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_consciousnessLevelId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_triageId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_visitCode_fkey";

-- DropForeignKey
ALTER TABLE "Vitals" DROP CONSTRAINT "Vitals_medcalRecordId_fkey";

-- DropForeignKey
ALTER TABLE "_ComorbidityToPatient" DROP CONSTRAINT "_ComorbidityToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComorbidityToPatient" DROP CONSTRAINT "_ComorbidityToPatient_B_fkey";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "mainComplaint" TEXT;

-- AlterTable
ALTER TABLE "Vitals" DROP COLUMN "medcalRecordId",
DROP COLUMN "painScore",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "visitCode" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- DropTable
DROP TABLE "MedicalRecord";

-- DropTable
DROP TABLE "_ComorbidityToPatient";

-- CreateTable
CREATE TABLE "Surgery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "place" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitCode" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Surgery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "icdCode" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCode" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalProblem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beginDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "verfication" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "referedById" TEXT NOT NULL,

    CONSTRAINT "MedicalProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beginDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "reaction" TEXT,
    "severity" TEXT,
    "occurrence" TEXT,
    "verfication" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "referedById" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "drugName" TEXT NOT NULL,
    "beginDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "medicationUsage" TEXT,
    "dosageInstruction" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referedById" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "drugName" TEXT NOT NULL,
    "beginDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "medicineUnit" TEXT,
    "dosage" TEXT NOT NULL,
    "refills" TEXT,
    "substitutionAllowed" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitCode" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriageAx" (
    "id" TEXT NOT NULL,
    "painScore" DOUBLE PRECISION,
    "consciousnessLevelId" INTEGER,
    "triageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCode" TEXT NOT NULL,

    CONSTRAINT "TriageAx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrimarySurvey" (
    "id" TEXT NOT NULL,
    "airway" TEXT NOT NULL,
    "breathing" TEXT NOT NULL,
    "circulation" TEXT NOT NULL,
    "disability" TEXT NOT NULL,
    "exposure" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitCode" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "PrimarySurvey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "patientId" TEXT NOT NULL,
    "visitCode" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "patientId" TEXT NOT NULL,
    "visitCode" TEXT NOT NULL,

    CONSTRAINT "LabTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationRequest" (
    "id" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "reason" TEXT,
    "clinicalData" TEXT,
    "consultationReport" TEXT,
    "recommendations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "consultantId" TEXT NOT NULL,
    "visitId" TEXT,

    CONSTRAINT "ConsultationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_visitCode_key" ON "Prescription"("visitCode");

-- CreateIndex
CREATE UNIQUE INDEX "TriageAx_visitCode_key" ON "TriageAx"("visitCode");

-- CreateIndex
CREATE UNIQUE INDEX "PrimarySurvey_visitCode_key" ON "PrimarySurvey"("visitCode");

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalProblem" ADD CONSTRAINT "MedicalProblem_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalProblem" ADD CONSTRAINT "MedicalProblem_referedById_fkey" FOREIGN KEY ("referedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_referedById_fkey" FOREIGN KEY ("referedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_referedById_fkey" FOREIGN KEY ("referedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageAx" ADD CONSTRAINT "TriageAx_consciousnessLevelId_fkey" FOREIGN KEY ("consciousnessLevelId") REFERENCES "LOC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageAx" ADD CONSTRAINT "TriageAx_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "TriageType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriageAx" ADD CONSTRAINT "TriageAx_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrimarySurvey" ADD CONSTRAINT "PrimarySurvey_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrimarySurvey" ADD CONSTRAINT "PrimarySurvey_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_visitCode_fkey" FOREIGN KEY ("visitCode") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("code") ON DELETE SET NULL ON UPDATE CASCADE;
