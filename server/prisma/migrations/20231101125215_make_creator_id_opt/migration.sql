-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_createdById_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
