-- CreateTable
CREATE TABLE "Banque" (
    "bankIdentifierCode" TEXT NOT NULL,
    "numeroCompteBanque" TEXT NOT NULL,
    "solde" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Banque_pkey" PRIMARY KEY ("bankIdentifierCode")
);

-- CreateTable
CREATE TABLE "RemboursementPret" (
    "idRemboursement" TEXT NOT NULL,
    "montantAPayer" DECIMAL(65,30) NOT NULL,
    "numeroCompteDeLaBanque" TEXT NOT NULL,

    CONSTRAINT "RemboursementPret_pkey" PRIMARY KEY ("idRemboursement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banque_numeroCompteBanque_key" ON "Banque"("numeroCompteBanque");

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_idRemboursement_fkey" FOREIGN KEY ("idRemboursement") REFERENCES "Pret"("numeroPret") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompteDeLaBanque_fkey" FOREIGN KEY ("numeroCompteDeLaBanque") REFERENCES "Banque"("numeroCompteBanque") ON DELETE RESTRICT ON UPDATE CASCADE;
