-- DropForeignKey
ALTER TABLE "product_pictures" DROP CONSTRAINT "product_pictures_file_path_id_fkey";

-- CreateIndex
CREATE INDEX "product_pictures_product_id_order_idx" ON "product_pictures"("product_id", "order");

-- AddForeignKey
ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_file_path_id_fkey" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
