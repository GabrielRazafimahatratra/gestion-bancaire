/*
  Warnings:

  - You are about to drop the column `emprunteurId` on the `Pret` table. All the data in the column will be lost.
  - You are about to drop the column `numeroCompte` on the `Pret` table. All the data in the column will be lost.
  - Added the required column `numeroCompteEmprunteur` to the `Pret` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pret" DROP CONSTRAINT "Pret_emprunteurId_fkey";

-- AlterTable
ALTER TABLE "Pret" DROP COLUMN "emprunteurId",
DROP COLUMN "numeroCompte",
ADD COLUMN     "numeroCompteEmprunteur" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pret" ADD CONSTRAINT "Pret_numeroCompteEmprunteur_fkey" FOREIGN KEY ("numeroCompteEmprunteur") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;
