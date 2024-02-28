/*
  Warnings:

  - You are about to drop the column `governate` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "governate",
ADD COLUMN     "governateId" INTEGER;

-- CreateTable
CREATE TABLE "Governate" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Governate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Governate_value_key" ON "Governate"("value");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_governateId_fkey" FOREIGN KEY ("governateId") REFERENCES "Governate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
