-- CreateTable
CREATE TABLE "employee_allowed_posts" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "employee_allowed_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_allowed_posts" ADD CONSTRAINT "employee_allowed_posts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_allowed_posts" ADD CONSTRAINT "employee_allowed_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
