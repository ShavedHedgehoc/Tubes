-- CreateTable
CREATE TABLE "goals" (
    "id" SERIAL NOT NULL,
    "metric_name" TEXT NOT NULL,
    "target_value" DOUBLE PRECISION NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);
