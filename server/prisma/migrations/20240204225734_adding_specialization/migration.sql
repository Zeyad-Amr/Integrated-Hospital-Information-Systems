/*
  Warnings:

  - You are about to drop the column `permission` on the `Permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "permission";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Specialization" ADD COLUMN     "description" TEXT;

-- DropEnum
DROP TYPE "PermissionEnum";
