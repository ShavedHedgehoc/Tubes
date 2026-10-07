-- CreateTable
CREATE TABLE "image_paths" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "image_paths_pkey" PRIMARY KEY ("id")
);
