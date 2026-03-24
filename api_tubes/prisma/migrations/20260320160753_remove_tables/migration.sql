/*
  Warnings:

  - You are about to drop the `extrusion_defects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `extrusion_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `extrusion_sop_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `extrusion_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offset_defects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offset_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offset_sop_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offset_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sealant_defects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sealant_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sealant_sop_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sealant_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `varnish_defects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `varnish_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `varnish_sop_pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `varnish_statuses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "extrusion_defects" DROP CONSTRAINT "extrusion_defects_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_sop_pictures" DROP CONSTRAINT "extrusion_sop_pictures_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_statuses" DROP CONSTRAINT "extrusion_statuses_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_statuses" DROP CONSTRAINT "extrusion_statuses_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_statuses" DROP CONSTRAINT "extrusion_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_defects" DROP CONSTRAINT "offset_defects_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_sop_pictures" DROP CONSTRAINT "offset_sop_pictures_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_statuses" DROP CONSTRAINT "offset_statuses_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_statuses" DROP CONSTRAINT "offset_statuses_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_statuses" DROP CONSTRAINT "offset_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_defects" DROP CONSTRAINT "sealant_defects_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_sop_pictures" DROP CONSTRAINT "sealant_sop_pictures_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_statuses" DROP CONSTRAINT "sealant_statuses_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_statuses" DROP CONSTRAINT "sealant_statuses_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_statuses" DROP CONSTRAINT "sealant_statuses_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_defects" DROP CONSTRAINT "varnish_defects_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_sop_pictures" DROP CONSTRAINT "varnish_sop_pictures_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_statuses" DROP CONSTRAINT "varnish_statuses_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_statuses" DROP CONSTRAINT "varnish_statuses_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_statuses" DROP CONSTRAINT "varnish_statuses_summary_id_fkey";

-- DropTable
DROP TABLE "extrusion_defects";

-- DropTable
DROP TABLE "extrusion_operations";

-- DropTable
DROP TABLE "extrusion_sop_pictures";

-- DropTable
DROP TABLE "extrusion_statuses";

-- DropTable
DROP TABLE "offset_defects";

-- DropTable
DROP TABLE "offset_operations";

-- DropTable
DROP TABLE "offset_sop_pictures";

-- DropTable
DROP TABLE "offset_statuses";

-- DropTable
DROP TABLE "sealant_defects";

-- DropTable
DROP TABLE "sealant_operations";

-- DropTable
DROP TABLE "sealant_sop_pictures";

-- DropTable
DROP TABLE "sealant_statuses";

-- DropTable
DROP TABLE "varnish_defects";

-- DropTable
DROP TABLE "varnish_operations";

-- DropTable
DROP TABLE "varnish_sop_pictures";

-- DropTable
DROP TABLE "varnish_statuses";
