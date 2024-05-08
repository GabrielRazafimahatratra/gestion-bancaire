-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_fkey";

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_fkey" FOREIGN KEY ("numeroCompteDeLaBanque") REFERENCES "Banque"("bankIdentifierCode") ON DELETE RESTRICT ON UPDATE CASCADE;
