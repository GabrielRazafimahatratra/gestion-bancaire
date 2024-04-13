-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_montantAPayer_fkey";

-- DropIndex
DROP INDEX "Banque_numeroCompteBanque_soldePayeParRemboursements_key";

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_fkey" FOREIGN KEY ("numeroCompteDeLaBanque") REFERENCES "Banque"("numeroCompteBanque") ON DELETE RESTRICT ON UPDATE CASCADE;
