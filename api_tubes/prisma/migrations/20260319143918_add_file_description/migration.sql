/*
  Warnings:

  - Added the required column `description` to the `file_paths` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file_paths" ADD COLUMN     "description" VARCHAR(300) NOT NULL DEFAULT '';
