-- CreateEnum
CREATE TYPE "VolumeRange" AS ENUM ('KG_300', 'KG_500', 'T_1', 'T_3', 'T_5', 'T_10', 'T_20', 'T_30');

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationMargin" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "volume" "VolumeRange" NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OperationMargin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OperationMargin_plantId_operationId_volume_key" ON "OperationMargin"("plantId", "operationId", "volume");

-- AddForeignKey
ALTER TABLE "OperationMargin" ADD CONSTRAINT "OperationMargin_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationMargin" ADD CONSTRAINT "OperationMargin_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
