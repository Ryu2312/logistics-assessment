/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Operation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OperationMargin" DROP CONSTRAINT "OperationMargin_operationId_fkey";

-- DropForeignKey
ALTER TABLE "OperationMargin" DROP CONSTRAINT "OperationMargin_plantId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Operation_name_key" ON "Operation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");

-- AddForeignKey
ALTER TABLE "OperationMargin" ADD CONSTRAINT "OperationMargin_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationMargin" ADD CONSTRAINT "OperationMargin_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
