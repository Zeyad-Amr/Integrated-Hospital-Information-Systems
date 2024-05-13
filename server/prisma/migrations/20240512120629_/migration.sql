/*
  Warnings:

  - A unique constraint covering the columns `[featureId,roleTypeId,subDepartmentId]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureRoleSubDepartment" ON "Permissions"("featureId", "roleTypeId", "subDepartmentId");
