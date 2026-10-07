/*
  Warnings:

  - You are about to drop the column `src` on the `operation_pictures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[operation_id,file_path_id]` on the table `operation_pictures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_path_id` to the `operation_pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "consumed_materials" DROP CONSTRAINT "consumed_materials_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "consumed_materials" DROP CONSTRAINT "consumed_materials_material_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_params" DROP CONSTRAINT "extrusion_params_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_params" DROP CONSTRAINT "extrusion_params_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_params" DROP CONSTRAINT "offset_params_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_params" DROP CONSTRAINT "offset_params_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_min_rank_id_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_post_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_params" DROP CONSTRAINT "sealant_params_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_params" DROP CONSTRAINT "sealant_params_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_material_id_fkey";

-- DropForeignKey
ALTER TABLE "statuses" DROP CONSTRAINT "statuses_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "statuses" DROP CONSTRAINT "statuses_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_product_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_params" DROP CONSTRAINT "varnish_params_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_params" DROP CONSTRAINT "varnish_params_summary_id_fkey";

-- AlterTable
ALTER TABLE "operation_pictures" DROP COLUMN "src",
ADD COLUMN     "file_path_id" INTEGER NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "product_pictures" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tresholds" ALTER COLUMN "extrusion_tube_cylindrical_section_length_max" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "extrusion_tube_cylindrical_section_length_min" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "extrusion_params_summary_id_idx" ON "extrusion_params"("summary_id");

-- CreateIndex
CREATE INDEX "offset_params_summary_id_idx" ON "offset_params"("summary_id");

-- CreateIndex
CREATE UNIQUE INDEX "operation_pictures_operation_id_file_path_id_key" ON "operation_pictures"("operation_id", "file_path_id");

-- CreateIndex
CREATE INDEX "production_boxes_summary_id_idx" ON "production_boxes"("summary_id");

-- CreateIndex
CREATE INDEX "production_boxes_createdAt_idx" ON "production_boxes"("createdAt");

-- CreateIndex
CREATE INDEX "sealant_params_summary_id_idx" ON "sealant_params"("summary_id");

-- CreateIndex
CREATE INDEX "statuses_summary_id_idx" ON "statuses"("summary_id");

-- CreateIndex
CREATE INDEX "statuses_post_id_createdAt_idx" ON "statuses"("post_id", "createdAt");

-- CreateIndex
CREATE INDEX "statuses_createdAt_idx" ON "statuses"("createdAt");

-- CreateIndex
CREATE INDEX "summaries_conveyor_id_isActive_idx" ON "summaries"("conveyor_id", "isActive");

-- CreateIndex
CREATE INDEX "summaries_date_idx" ON "summaries"("date");

-- CreateIndex
CREATE INDEX "tresholds_product_id_createdAt_idx" ON "tresholds"("product_id", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "varnish_params_summary_id_idx" ON "varnish_params"("summary_id");

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_min_rank_id_fkey" FOREIGN KEY ("min_rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_pictures" ADD CONSTRAINT "operation_pictures_file_path_id_fkey" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_params" ADD CONSTRAINT "varnish_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_params" ADD CONSTRAINT "varnish_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_params" ADD CONSTRAINT "offset_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_params" ADD CONSTRAINT "offset_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_params" ADD CONSTRAINT "sealant_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_params" ADD CONSTRAINT "sealant_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
