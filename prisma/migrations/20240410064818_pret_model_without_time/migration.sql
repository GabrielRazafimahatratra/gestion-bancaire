/*
  Warnings:

  - A unique constraint covering the columns `[emailCaissier]` on the table `Caissier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailClient]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pret" ALTER COLUMN "delaiPret" SET DATA TYPE DATE,
ALTER COLUMN "datePret" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Caissier_emailCaissier_key" ON "Caissier"("emailCaissier");

-- CreateIndex
CREATE UNIQUE INDEX "Client_emailClient_key" ON "Client"("emailClient");
