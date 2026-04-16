/*
  Warnings:

  - A unique constraint covering the columns `[maintenance_id,title]` on the table `maintenance_tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `maintenances` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[val]` on the table `ranks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "maintenance_tasks_maintenance_id_title_key" ON "maintenance_tasks"("maintenance_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "maintenances_value_key" ON "maintenances"("value");

-- CreateIndex
CREATE UNIQUE INDEX "operations_value_key" ON "operations"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ranks_val_key" ON "ranks"("val");
