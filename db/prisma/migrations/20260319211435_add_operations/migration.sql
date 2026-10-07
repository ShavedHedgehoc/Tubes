/*
  Warnings:

  - You are about to drop the column `min_rank` on the `operations` table. All the data in the column will be lost.
  - Added the required column `min_rank_id` to the `operations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "operations" DROP COLUMN "min_rank",
ADD COLUMN     "min_rank_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_min_rank_id_fkey" FOREIGN KEY ("min_rank_id") REFERENCES "ranks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
