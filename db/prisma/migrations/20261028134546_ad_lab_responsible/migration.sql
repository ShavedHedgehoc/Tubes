-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "lab_responsible_id" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_lab_responsible_id_fkey" FOREIGN KEY ("lab_responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
