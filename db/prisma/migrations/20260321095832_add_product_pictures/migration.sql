/*
  Warnings:

  - You are about to drop the `pictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_product_id_fkey";

-- DropTable
DROP TABLE "pictures";

-- CreateTable
CREATE TABLE "product_pictures" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "file_path_id" INTEGER NOT NULL,

    CONSTRAINT "product_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_pictures_product_id_file_path_id_key" ON "product_pictures"("product_id", "file_path_id");

-- AddForeignKey
ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_file_path_id_fkey" FOREIGN KEY ("file_path_id") REFERENCES "file_paths"("id") ON DELETE CASCADE ON UPDATE CASCADE;
