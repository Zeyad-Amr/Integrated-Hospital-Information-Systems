-- CreateEnum
CREATE TYPE "IdentityEnum" AS ENUM ('NATIONALIDCARD', 'PASSPORT');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "KinshipEnum" AS ENUM ('BROTHER', 'SISTER', 'FATHER', 'MOTHER', 'COUSIN', 'AUNT', 'OTHER');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'EMPLOYEE', 'DOCTOR', 'NURSE');

-- CreateEnum
CREATE TYPE "ShiftEnum" AS ENUM ('MORNING8', 'AFTERNOON8', 'NIGHT8', 'MORNING12', 'NIGHT12', 'LONG');

-- CreateEnum
CREATE TYPE "CameFromOptions" AS ENUM ('HOME', 'ACCIDENT', 'PRISONER');

-- CreateEnum
CREATE TYPE "AttendantRole" AS ENUM ('PARAMEDIC', 'OFFICER');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "thirdName" TEXT NOT NULL,
    "fourthName" TEXT NOT NULL,
    "SSN" TEXT,
    "verificationMethod" "IdentityEnum",
    "gender" "GenderEnum" NOT NULL,
    "birthDate" DATE,
    "phone" TEXT,
    "governate" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL,
    "shift" "ShiftEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "personID" TEXT NOT NULL,
    "createdById" TEXT,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "code" TEXT NOT NULL,
    "sequenceNumber" INTEGER,
    "kinship" "KinshipEnum",
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "patientId" TEXT,
    "companionId" TEXT,
    "incidentId" TEXT,
    "additionalInfoId" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "numberOfPatients" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "additionalInfoId" TEXT,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionsOnIncidents" (
    "companionId" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,

    CONSTRAINT "CompanionsOnIncidents_pkey" PRIMARY KEY ("companionId","incidentId")
);

-- CreateTable
CREATE TABLE "CarNumber" (
    "id" TEXT NOT NULL,
    "firstChar" VARCHAR(1) NOT NULL,
    "secondChar" VARCHAR(1) NOT NULL,
    "thirdChar" VARCHAR(1) NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "CarNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendant" (
    "id" TEXT NOT NULL,
    "SSN" TEXT,
    "cardId" TEXT,
    "name" TEXT NOT NULL,
    "attendantRole" "AttendantRole" NOT NULL,

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
    "attendantId" TEXT,

    CONSTRAINT "VisitAdditionalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_SSN_key" ON "Person"("SSN");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_personID_key" ON "Employee"("personID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_Unique" ON "CarNumber"("firstChar", "secondChar", "thirdChar", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_SSN_key" ON "Attendant"("SSN");

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_cardId_key" ON "Attendant"("cardId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_personID_fkey" FOREIGN KEY ("personID") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_additionalInfoId_fkey" FOREIGN KEY ("additionalInfoId") REFERENCES "VisitAdditionalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_additionalInfoId_fkey" FOREIGN KEY ("additionalInfoId") REFERENCES "VisitAdditionalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionsOnIncidents" ADD CONSTRAINT "CompanionsOnIncidents_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionsOnIncidents" ADD CONSTRAINT "CompanionsOnIncidents_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitAdditionalInformation" ADD CONSTRAINT "VisitAdditionalInformation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "CarNumber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitAdditionalInformation" ADD CONSTRAINT "VisitAdditionalInformation_attendantId_fkey" FOREIGN KEY ("attendantId") REFERENCES "Attendant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
