-- AlterTable
ALTER TABLE "extrusion_params" ADD COLUMN     "tube_conical_shoulder_thickness" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "tresholds" ADD COLUMN     "extrusion_tube_conical_shoulder_thickness_max" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "extrusion_tube_conical_shoulder_thickness_min" DOUBLE PRECISION NOT NULL DEFAULT 0;
