-- CreateIndex
CREATE INDEX "maintenance_logs_session_id_idx" ON "maintenance_logs"("session_id");

-- CreateIndex
CREATE INDEX "maintenance_logs_task_id_idx" ON "maintenance_logs"("task_id");

-- CreateIndex
CREATE INDEX "maintenance_logs_task_id_start_time_idx" ON "maintenance_logs"("task_id", "start_time");

-- CreateIndex
CREATE INDEX "maintenance_sessions_post_id_idx" ON "maintenance_sessions"("post_id");

-- CreateIndex
CREATE INDEX "maintenance_sessions_maintenance_id_idx" ON "maintenance_sessions"("maintenance_id");

-- CreateIndex
CREATE INDEX "maintenance_sessions_start_time_idx" ON "maintenance_sessions"("start_time");

-- CreateIndex
CREATE INDEX "maintenance_tasks_maintenance_id_idx" ON "maintenance_tasks"("maintenance_id");

-- CreateIndex
CREATE INDEX "statuses_maintenance_session_id_idx" ON "statuses"("maintenance_session_id");
