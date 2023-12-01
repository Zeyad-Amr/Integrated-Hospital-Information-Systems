/*
  Warnings:

  - The values [RECEPTIONIST] on the enum `RoleEnum` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `departmentId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShiftEnum" AS ENUM ('MORNING8', 'AFTERNOON8', 'NIGHT8', 'MORNING12', 'NIGHT14', 'LONG');

-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnum_new" AS ENUM ('ADMIN', 'EMPLOYEE', 'DOCTOR', 'NURSE');
ALTER TABLE "Employee" ALTER COLUMN "role" TYPE "RoleEnum_new" USING ("role"::text::"RoleEnum_new");
ALTER TYPE "RoleEnum" RENAME TO "RoleEnum_old";
ALTER TYPE "RoleEnum_new" RENAME TO "RoleEnum";
DROP TYPE "RoleEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "departmentId" TEXT NOT NULL,
ADD COLUMN     "shift" "ShiftEnum" NOT NULL;

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
