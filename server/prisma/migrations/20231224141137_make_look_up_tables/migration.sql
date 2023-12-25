/*
  Warnings:

  - You are about to drop the column `attendantRole` on the `Attendant` table. All the data in the column will be lost.
  - You are about to drop the column `kinship` on the `Companion` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `consciousnessLevel` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `triage` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `comorbidities` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `verificationMethod` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `cameFrom` on the `VisitAdditionalInformation` table. All the data in the column will be lost.
  - Added the required column `attendantRoleId` to the `Attendant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shiftId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genderId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cameFromId` to the `VisitAdditionalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendant" DROP COLUMN "attendantRole",
ADD COLUMN     "attendantRoleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Companion" DROP COLUMN "kinship",
ADD COLUMN     "kinshipId" INTEGER;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
DROP COLUMN "shift",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "shiftId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "consciousnessLevel",
DROP COLUMN "triage",
ADD COLUMN     "consciousnessLevelId" INTEGER,
ADD COLUMN     "triageId" INTEGER;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "comorbidities";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "gender",
DROP COLUMN "verificationMethod",
ADD COLUMN     "genderId" INTEGER NOT NULL,
ADD COLUMN     "verificationMethodId" INTEGER;

-- AlterTable
ALTER TABLE "VisitAdditionalInformation" DROP COLUMN "cameFrom",
ADD COLUMN     "cameFromId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "AttendantRole";

-- DropEnum
DROP TYPE "CameFromOptions";

-- DropEnum
DROP TYPE "Comorbidity";

-- DropEnum
DROP TYPE "ConsciousnessLevel";

-- DropEnum
DROP TYPE "GenderEnum";

-- DropEnum
DROP TYPE "IdentityEnum";

-- DropEnum
DROP TYPE "KinshipEnum";

-- DropEnum
DROP TYPE "RoleEnum";

-- DropEnum
DROP TYPE "ShiftEnum";

-- DropEnum
DROP TYPE "Triage";

-- CreateTable
CREATE TABLE "IdentityType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "IdentityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenderType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GenderType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KinshipType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "KinshipType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "RoleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ShiftType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CameFromOptions" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CameFromOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendantRole" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "AttendantRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriageType" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "TriageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LOC" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "LOC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comorbidity" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Comorbidity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComorbidityToPatient" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityType_value_key" ON "IdentityType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "GenderType_value_key" ON "GenderType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "KinshipType_value_key" ON "KinshipType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "RoleType_value_key" ON "RoleType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ShiftType_value_key" ON "ShiftType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "CameFromOptions_value_key" ON "CameFromOptions"("value");

-- CreateIndex
CREATE UNIQUE INDEX "AttendantRole_value_key" ON "AttendantRole"("value");

-- CreateIndex
CREATE UNIQUE INDEX "TriageType_value_key" ON "TriageType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "LOC_value_key" ON "LOC"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Comorbidity_value_key" ON "Comorbidity"("value");

-- CreateIndex
CREATE UNIQUE INDEX "_ComorbidityToPatient_AB_unique" ON "_ComorbidityToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_ComorbidityToPatient_B_index" ON "_ComorbidityToPatient"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_verificationMethodId_fkey" FOREIGN KEY ("verificationMethodId") REFERENCES "IdentityType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "GenderType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_kinshipId_fkey" FOREIGN KEY ("kinshipId") REFERENCES "KinshipType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RoleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "ShiftType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendant" ADD CONSTRAINT "Attendant_attendantRoleId_fkey" FOREIGN KEY ("attendantRoleId") REFERENCES "AttendantRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitAdditionalInformation" ADD CONSTRAINT "VisitAdditionalInformation_cameFromId_fkey" FOREIGN KEY ("cameFromId") REFERENCES "CameFromOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_consciousnessLevelId_fkey" FOREIGN KEY ("consciousnessLevelId") REFERENCES "LOC"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_triageId_fkey" FOREIGN KEY ("triageId") REFERENCES "TriageType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComorbidityToPatient" ADD CONSTRAINT "_ComorbidityToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "Comorbidity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComorbidityToPatient" ADD CONSTRAINT "_ComorbidityToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
