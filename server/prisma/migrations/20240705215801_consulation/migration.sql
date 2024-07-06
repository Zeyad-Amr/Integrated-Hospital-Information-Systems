/*
  Warnings:

  - Added the required column `consultationSpecialtyId` to the `ConsultationRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `visitId` on table `ConsultationRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ConsultationRequest" DROP CONSTRAINT "ConsultationRequest_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationRequest" DROP CONSTRAINT "ConsultationRequest_visitId_fkey";

-- AlterTable
ALTER TABLE "ConsultationRequest" ADD COLUMN     "consultationSpecialtyId" INTEGER NOT NULL,
ALTER COLUMN "consultantId" DROP NOT NULL,
ALTER COLUMN "visitId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "dischargeDate" TIMESTAMPTZ(3),
ADD COLUMN     "dischargeReason" TEXT;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRequest" ADD CONSTRAINT "ConsultationRequest_consultationSpecialtyId_fkey" FOREIGN KEY ("consultationSpecialtyId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
