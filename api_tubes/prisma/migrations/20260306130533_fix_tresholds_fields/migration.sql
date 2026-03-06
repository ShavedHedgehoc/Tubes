/*
  Warnings:

  - You are about to drop the column `tube_cilindrical_section_length` on the `extrusion_params` table. All the data in the column will be lost.
  - You are about to drop the column `tube_cilindrical_section_thickness` on the `extrusion_params` table. All the data in the column will be lost.
  - You are about to drop the column `extrusion_tube_cilindrical_section_length_max` on the `tresholds` table. All the data in the column will be lost.
  - You are about to drop the column `extrusion_tube_cilindrical_section_length_min` on the `tresholds` table. All the data in the column will be lost.
  - You are about to drop the column `extrusion_tube_cilindrical_section_thickness_max` on the `tresholds` table. All the data in the column will be lost.
  - You are about to drop the column `extrusion_tube_cilindrical_section_thickness_min` on the `tresholds` table. All the data in the column will be lost.
  - You are about to drop the `extrusion_tresholds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offset_tresholds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sealant_tresholds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `varnish_tresholds` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tube_cylindrical_section_length` to the `extrusion_params` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tube_cylindrical_section_thickness` to the `extrusion_params` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extrusion_tube_cylindrical_section_length_max` to the `tresholds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extrusion_tube_cylindrical_section_length_min` to the `tresholds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extrusion_tube_cylindrical_section_thickness_max` to the `tresholds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extrusion_tube_cylindrical_section_thickness_min` to the `tresholds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "extrusion_tresholds" DROP CONSTRAINT "extrusion_tresholds_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_tresholds" DROP CONSTRAINT "extrusion_tresholds_product_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_tresholds" DROP CONSTRAINT "offset_tresholds_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "offset_tresholds" DROP CONSTRAINT "offset_tresholds_product_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_tresholds" DROP CONSTRAINT "sealant_tresholds_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "sealant_tresholds" DROP CONSTRAINT "sealant_tresholds_product_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_tresholds" DROP CONSTRAINT "varnish_tresholds_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "varnish_tresholds" DROP CONSTRAINT "varnish_tresholds_product_id_fkey";

-- AlterTable
ALTER TABLE "extrusion_params" DROP COLUMN "tube_cilindrical_section_length",
DROP COLUMN "tube_cilindrical_section_thickness",
ADD COLUMN     "tube_cylindrical_section_length" INTEGER NOT NULL,
ADD COLUMN     "tube_cylindrical_section_thickness" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "tresholds" DROP COLUMN "extrusion_tube_cilindrical_section_length_max",
DROP COLUMN "extrusion_tube_cilindrical_section_length_min",
DROP COLUMN "extrusion_tube_cilindrical_section_thickness_max",
DROP COLUMN "extrusion_tube_cilindrical_section_thickness_min",
ADD COLUMN     "extrusion_tube_cylindrical_section_length_max" INTEGER NOT NULL,
ADD COLUMN     "extrusion_tube_cylindrical_section_length_min" INTEGER NOT NULL,
ADD COLUMN     "extrusion_tube_cylindrical_section_thickness_max" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "extrusion_tube_cylindrical_section_thickness_min" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "extrusion_tresholds";

-- DropTable
DROP TABLE "offset_tresholds";

-- DropTable
DROP TABLE "sealant_tresholds";

-- DropTable
DROP TABLE "varnish_tresholds";
