/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Department` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `departmentId` on the `Employee` table. All the data in the column will be lost.
  - The `departmentId` column on the `SubDepartment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `from` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `fromSubDepId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toSubDepId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_departmentId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "departmentId";

-- AlterTable
ALTER TABLE "SubDepartment" DROP COLUMN "departmentId",
ADD COLUMN     "departmentId" INTEGER;

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "fromSubDepId" INTEGER NOT NULL,
ADD COLUMN     "toSubDepId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubDepartment" ADD CONSTRAINT "SubDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromSubDepId_fkey" FOREIGN KEY ("fromSubDepId") REFERENCES "SubDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toSubDepId_fkey" FOREIGN KEY ("toSubDepId") REFERENCES "SubDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
