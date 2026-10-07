-- AlterTable
ALTER TABLE "statuses" ADD COLUMN     "is_locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "laboratory_lock_id" INTEGER;

-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "laboratory_locks" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summary_id" INTEGER NOT NULL,

    CONSTRAINT "laboratory_locks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "laboratory_locks_summary_id_idx" ON "laboratory_locks"("summary_id");

-- CreateIndex
CREATE INDEX "statuses_laboratory_lock_id_idx" ON "statuses"("laboratory_lock_id");

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_laboratory_lock_id_fkey" FOREIGN KEY ("laboratory_lock_id") REFERENCES "laboratory_locks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_locks" ADD CONSTRAINT "laboratory_locks_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
