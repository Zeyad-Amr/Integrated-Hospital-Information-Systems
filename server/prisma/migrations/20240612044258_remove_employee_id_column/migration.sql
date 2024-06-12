/*
  Warnings:

  - You are about to drop the `_EmployeeSubDepartments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeSubDepartments" DROP CONSTRAINT "_EmployeeSubDepartments_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeSubDepartments" DROP CONSTRAINT "_EmployeeSubDepartments_B_fkey";

-- DropTable
DROP TABLE "_EmployeeSubDepartments";

-- CreateTable
CREATE TABLE "_EmployeeToSubDepartment" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToSubDepartment_AB_unique" ON "_EmployeeToSubDepartment"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToSubDepartment_B_index" ON "_EmployeeToSubDepartment"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToSubDepartment" ADD CONSTRAINT "_EmployeeToSubDepartment_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToSubDepartment" ADD CONSTRAINT "_EmployeeToSubDepartment_B_fkey" FOREIGN KEY ("B") REFERENCES "SubDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
