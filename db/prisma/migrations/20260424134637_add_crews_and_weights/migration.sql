-- AlterTable
ALTER TABLE "summaries" ADD COLUMN     "crew_id" INTEGER;

-- CreateTable
CREATE TABLE "product_unit_weights" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_unit_weights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "crews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crews_name_key" ON "crews"("name");

-- AddForeignKey
ALTER TABLE "product_unit_weights" ADD CONSTRAINT "product_unit_weights_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_crew_id_fkey" FOREIGN KEY ("crew_id") REFERENCES "crews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
