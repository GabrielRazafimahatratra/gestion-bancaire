/*
  Warnings:

  - Added the required column `numeroCaisse` to the `Caissier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caissier" ADD COLUMN     "numeroCaisse" TEXT NOT NULL;
