/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SubDepartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubDepartment_name_key" ON "SubDepartment"("name");
