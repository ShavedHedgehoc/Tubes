-- AlterTable
ALTER TABLE "maintenance_logs" ALTER COLUMN "duration" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "maintenance_sessions" ALTER COLUMN "total_duration" SET DATA TYPE BIGINT,
ALTER COLUMN "work_duration" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "statuses" ALTER COLUMN "idle_time" SET DATA TYPE BIGINT;
