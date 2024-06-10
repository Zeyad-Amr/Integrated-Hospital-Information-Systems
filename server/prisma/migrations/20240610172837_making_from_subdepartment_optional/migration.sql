-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_fromSubDepId_fkey";

-- AlterTable
ALTER TABLE "Transfer" ALTER COLUMN "fromSubDepId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromSubDepId_fkey" FOREIGN KEY ("fromSubDepId") REFERENCES "SubDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
