-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "responsible_id" INTEGER;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
