-- AlterTable
ALTER TABLE "laboratory_locks" ADD COLUMN     "user_id" INTEGER,
ALTER COLUMN "laboratory_assistant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "laboratory_locks" ADD CONSTRAINT "laboratory_locks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
