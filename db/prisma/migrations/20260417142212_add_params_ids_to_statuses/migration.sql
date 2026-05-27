-- AlterTable
ALTER TABLE "statuses" ADD COLUMN     "extrusion_param_id" INTEGER,
ADD COLUMN     "offset_param_id" INTEGER,
ADD COLUMN     "sealant_param_id" INTEGER,
ADD COLUMN     "varnish_param_id" INTEGER;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_extrusion_param_id_fkey" FOREIGN KEY ("extrusion_param_id") REFERENCES "extrusion_params"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_varnish_param_id_fkey" FOREIGN KEY ("varnish_param_id") REFERENCES "varnish_params"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_offset_param_id_fkey" FOREIGN KEY ("offset_param_id") REFERENCES "offset_params"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statuses" ADD CONSTRAINT "statuses_sealant_param_id_fkey" FOREIGN KEY ("sealant_param_id") REFERENCES "sealant_params"("id") ON DELETE SET NULL ON UPDATE CASCADE;
