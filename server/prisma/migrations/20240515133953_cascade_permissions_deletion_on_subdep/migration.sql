-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_subDepartmentId_fkey";

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_subDepartmentId_fkey" FOREIGN KEY ("subDepartmentId") REFERENCES "SubDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
