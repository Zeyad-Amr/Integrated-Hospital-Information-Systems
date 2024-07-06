/*
  Warnings:

  - You are about to drop the column `consultationSpecialtyId` on the `ConsultationRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConsultationRequest" DROP CONSTRAINT "ConsultationRequest_consultationSpecialtyId_fkey";

-- AlterTable
ALTER TABLE "ConsultationRequest" DROP COLUMN "consultationSpecialtyId",
ADD COLUMN     "consultationSubdepartmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_consultationSubdepartmentId_fkey" FOREIGN KEY ("consultationSubdepartmentId") REFERENCES "SubDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
