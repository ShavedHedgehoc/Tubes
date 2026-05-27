/*
  Warnings:

  - Added the required column `task_id` to the `maintenance_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenance_logs" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "task_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "maintenance_sessions" ADD COLUMN     "total_duration" INTEGER,
ADD COLUMN     "work_duration" INTEGER;

-- AddForeignKey
ALTER TABLE "maintenance_logs" ADD CONSTRAINT "maintenance_logs_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "maintenance_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
