/*
  Warnings:

  - You are about to drop the column `rondel_id` on the `extrusion_params` table. All the data in the column will be lost.
  - You are about to drop the column `rondel_id` on the `extrusion_tresholds` table. All the data in the column will be lost.
  - You are about to drop the `rondels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "extrusion_params" DROP CONSTRAINT "extrusion_params_rondel_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_tresholds" DROP CONSTRAINT "extrusion_tresholds_rondel_id_fkey";

-- AlterTable
ALTER TABLE "extrusion_params" DROP COLUMN "rondel_id";

-- AlterTable
ALTER TABLE "extrusion_tresholds" DROP COLUMN "rondel_id";

-- DropTable
DROP TABLE "rondels";
