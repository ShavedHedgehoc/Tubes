-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "min_rank" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_pictures" (
    "id" SERIAL NOT NULL,
    "operation_id" INTEGER NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "operation_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_value_key" ON "posts"("value");

-- CreateIndex
CREATE UNIQUE INDEX "posts_name_key" ON "posts"("name");

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_pictures" ADD CONSTRAINT "operation_pictures_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
