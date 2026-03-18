/*
  Warnings:

  - You are about to drop the `image_paths` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "image_paths";

-- CreateTable
CREATE TABLE "file_paths" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "file_paths_pkey" PRIMARY KEY ("id")
);
