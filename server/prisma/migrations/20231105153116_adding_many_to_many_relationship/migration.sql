/*
  Warnings:

  - You are about to drop the column `incidentId` on the `Person` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_incidentId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "incidentId";

-- CreateTable
CREATE TABLE "CompanionsOnIncidents" (
    "companionId" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,

    CONSTRAINT "CompanionsOnIncidents_pkey" PRIMARY KEY ("companionId","incidentId")
);

-- AddForeignKey
ALTER TABLE "CompanionsOnIncidents" ADD CONSTRAINT "CompanionsOnIncidents_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanionsOnIncidents" ADD CONSTRAINT "CompanionsOnIncidents_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
