-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
