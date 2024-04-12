/*
  Warnings:

  - A unique constraint covering the columns `[idPret]` on the table `RemboursementPret` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idPret` to the `RemboursementPret` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_idRemboursement_fkey";

-- AlterTable
ALTER TABLE "RemboursementPret" ADD COLUMN     "idPret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RemboursementPret_idPret_key" ON "RemboursementPret"("idPret");

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_idPret_fkey" FOREIGN KEY ("idPret") REFERENCES "Pret"("numeroPret") ON DELETE RESTRICT ON UPDATE CASCADE;
