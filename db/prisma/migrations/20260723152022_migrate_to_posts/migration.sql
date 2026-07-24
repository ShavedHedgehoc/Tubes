/*
  Warnings:

  - You are about to drop the column `isLocked` on the `summaries` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `laboratory_locks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laboratory_locks" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "summaries" DROP COLUMN "isLocked";

-- CreateIndex
CREATE INDEX "laboratory_locks_summary_id_post_id_idx" ON "laboratory_locks"("summary_id", "post_id");

-- AddForeignKey
ALTER TABLE "laboratory_locks" ADD CONSTRAINT "laboratory_locks_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
