-- AlterTable
ALTER TABLE "statuses" ADD COLUMN     "maintenance_session_id" INTEGER;

-- CreateTable
CREATE TABLE "maintenances" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "min_rank_id" INTEGER NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_tasks" (
    "id" SERIAL NOT NULL,
    "maintenance_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "maintenance_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_sessions" (
    "id" SERIAL NOT NULL,
    "maintenance_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),

    CONSTRAINT "maintenance_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_logs" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "is_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "maintenance_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_maintenance_session_id_fkey" FOREIGN KEY ("maintenance_session_id") REFERENCES "maintenance_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_min_rank_id_fkey" FOREIGN KEY ("min_rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_tasks" ADD CONSTRAINT "maintenance_tasks_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_sessions" ADD CONSTRAINT "maintenance_sessions_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_sessions" ADD CONSTRAINT "maintenance_sessions_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_logs" ADD CONSTRAINT "maintenance_logs_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "maintenance_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
