-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "attendantID" TEXT,
ADD COLUMN     "attendantName" TEXT,
ADD COLUMN     "carId" TEXT;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_carId_fkey" FOREIGN KEY ("carId") REFERENCES "CarNumber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
