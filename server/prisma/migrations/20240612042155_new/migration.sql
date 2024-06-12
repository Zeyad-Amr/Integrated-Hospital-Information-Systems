/*
  Warnings:

  - You are about to drop the column `employeeId` on the `SubDepartment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_employeeId_fkey";

-- AlterTable
ALTER TABLE "SubDepartment" DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "_EmployeeSubDepartments" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeSubDepartments_AB_unique" ON "_EmployeeSubDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeSubDepartments_B_index" ON "_EmployeeSubDepartments"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeSubDepartments" ADD CONSTRAINT "_EmployeeSubDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeSubDepartments" ADD CONSTRAINT "_EmployeeSubDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "SubDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
