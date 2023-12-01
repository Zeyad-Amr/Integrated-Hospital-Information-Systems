/*
  Warnings:

  - The values [NIGHT14] on the enum `ShiftEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShiftEnum_new" AS ENUM ('MORNING8', 'AFTERNOON8', 'NIGHT8', 'MORNING12', 'NIGHT12', 'LONG');
ALTER TABLE "Employee" ALTER COLUMN "shift" TYPE "ShiftEnum_new" USING ("shift"::text::"ShiftEnum_new");
ALTER TYPE "ShiftEnum" RENAME TO "ShiftEnum_old";
ALTER TYPE "ShiftEnum_new" RENAME TO "ShiftEnum";
DROP TYPE "ShiftEnum_old";
COMMIT;
