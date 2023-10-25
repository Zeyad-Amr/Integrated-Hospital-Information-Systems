-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_companionId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_patientId_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "companionId" DROP NOT NULL,
ALTER COLUMN "incidentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;
