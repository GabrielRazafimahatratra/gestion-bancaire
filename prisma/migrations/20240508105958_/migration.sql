/*
  Warnings:

  - You are about to drop the column `numeroCompte` on the `RemboursementPret` table. All the data in the column will be lost.
  - You are about to drop the column `numeroPret` on the `RemboursementPret` table. All the data in the column will be lost.
  - Added the required column `numeroCompteVerseur` to the `RemboursementPret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroPretPourLeRemboursement` to the `RemboursementPret` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_numeroCompte_fkey";

-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_numeroPret_fkey";

-- AlterTable
ALTER TABLE "RemboursementPret" DROP COLUMN "numeroCompte",
DROP COLUMN "numeroPret",
ADD COLUMN     "numeroCompteVerseur" TEXT NOT NULL,
ADD COLUMN     "numeroPretPourLeRemboursement" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompteVerseur_fkey" FOREIGN KEY ("numeroCompteVerseur") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroPretPourLeRemboursement_fkey" FOREIGN KEY ("numeroPretPourLeRemboursement") REFERENCES "Pret"("numeroPret") ON DELETE RESTRICT ON UPDATE CASCADE;
