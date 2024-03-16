/*
  Warnings:

  - The `subDepartmentId` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Permissions` table. All the data in the column will be lost.
  - The primary key for the `Specialization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Specialization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SubDepartment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SubDepartment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `subDepartmentId` on the `Permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `specializationId` on the `SubDepartment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_subDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_subDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_specializationId_fkey";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "subDepartmentId",
ADD COLUMN     "subDepartmentId" INTEGER;

-- AlterTable
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_pkey",
DROP COLUMN "id",
DROP COLUMN "subDepartmentId",
ADD COLUMN     "subDepartmentId" INTEGER NOT NULL,
ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY ("featureId", "roleTypeId", "subDepartmentId");

-- AlterTable
ALTER TABLE "Specialization" DROP CONSTRAINT "Specialization_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubDepartment" DROP CONSTRAINT "SubDepartment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "specializationId",
ADD COLUMN     "specializationId" INTEGER NOT NULL,
ALTER COLUMN "departmentId" DROP DEFAULT,
ADD CONSTRAINT "SubDepartment_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SubDepartment" ADD CONSTRAINT "SubDepartment_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "Specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_subDepartmentId_fkey" FOREIGN KEY ("subDepartmentId") REFERENCES "SubDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_subDepartmentId_fkey" FOREIGN KEY ("subDepartmentId") REFERENCES "SubDepartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
