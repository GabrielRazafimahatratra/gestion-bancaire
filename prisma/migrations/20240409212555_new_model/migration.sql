/*
  Warnings:

  - The primary key for the `Caissier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numeroCaissier` on the `Caissier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Caissier" DROP CONSTRAINT "Caissier_pkey",
DROP COLUMN "numeroCaissier",
ADD CONSTRAINT "Caissier_pkey" PRIMARY KEY ("numeroCaisse");
