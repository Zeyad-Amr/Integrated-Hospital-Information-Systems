-- AlterTable
ALTER TABLE "VisitAdditionalInformation" ADD COLUMN     "attendantId" TEXT;

-- AddForeignKey
ALTER TABLE "VisitAdditionalInformation" ADD CONSTRAINT "VisitAdditionalInformation_attendantId_fkey" FOREIGN KEY ("attendantId") REFERENCES "Attendant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
