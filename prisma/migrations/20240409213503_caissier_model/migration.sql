/*
  Warnings:

  - The primary key for the `Caissier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numeroCaisse` on the `Caissier` table. All the data in the column will be lost.
  - Added the required column `numeroCaissier` to the `Caissier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caissier" DROP CONSTRAINT "Caissier_pkey",
DROP COLUMN "numeroCaisse",
ADD COLUMN     "numeroCaissier" TEXT NOT NULL,
ADD CONSTRAINT "Caissier_pkey" PRIMARY KEY ("numeroCaissier");
