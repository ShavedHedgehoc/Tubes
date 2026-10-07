/*
  Warnings:

  - You are about to drop the column `description` on the `laboratory_locks` table. All the data in the column will be lost.
  - Added the required column `laboratory_assistant_id` to the `laboratory_locks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laboratory_lock_reason_id` to the `laboratory_locks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laboratory_locks" DROP COLUMN "description",
ADD COLUMN     "laboratory_assistant_id" INTEGER NOT NULL,
ADD COLUMN     "laboratory_lock_reason_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "laboratory_lock_reasons" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "laboratory_lock_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laboratory_assistants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "laboratory_assistants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "laboratory_lock_reasons_value_key" ON "laboratory_lock_reasons"("value");

-- CreateIndex
CREATE UNIQUE INDEX "laboratory_assistants_name_key" ON "laboratory_assistants"("name");

-- AddForeignKey
ALTER TABLE "laboratory_locks" ADD CONSTRAINT "laboratory_locks_laboratory_lock_reason_id_fkey" FOREIGN KEY ("laboratory_lock_reason_id") REFERENCES "laboratory_lock_reasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_locks" ADD CONSTRAINT "laboratory_locks_laboratory_assistant_id_fkey" FOREIGN KEY ("laboratory_assistant_id") REFERENCES "laboratory_assistants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
