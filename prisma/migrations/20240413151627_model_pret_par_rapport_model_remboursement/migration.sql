/*
  Warnings:

  - Added the required column `restePret` to the `Pret` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pret" ADD COLUMN     "restePret" DECIMAL(65,30) NOT NULL;
