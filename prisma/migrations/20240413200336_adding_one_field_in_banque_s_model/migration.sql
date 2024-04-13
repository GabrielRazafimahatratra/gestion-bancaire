/*
  Warnings:

  - You are about to drop the column `solde` on the `Banque` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numeroCompteBanque,soldePayeParRemboursements]` on the table `Banque` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `soldeBanque` to the `Banque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldePayeParRemboursements` to the `Banque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_fkey";

-- AlterTable
ALTER TABLE "Banque" DROP COLUMN "solde",
ADD COLUMN     "soldeBanque" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "soldePayeParRemboursements" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Banque_numeroCompteBanque_soldePayeParRemboursements_key" ON "Banque"("numeroCompteBanque", "soldePayeParRemboursements");

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_montantAPayer_fkey" FOREIGN KEY ("numeroCompteDeLaBanque", "montantAPayer") REFERENCES "Banque"("numeroCompteBanque", "soldePayeParRemboursements") ON DELETE RESTRICT ON UPDATE CASCADE;
