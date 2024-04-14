-- CreateTable
CREATE TABLE "Versement" (
    "numeroVersement" TEXT NOT NULL,
    "numeroCompteVersement" TEXT NOT NULL,
    "montantVersement" DECIMAL(65,30) NOT NULL,
    "dateVersement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nomVerseur" TEXT NOT NULL,
    "prenomsVerseur" TEXT,

    CONSTRAINT "Versement_pkey" PRIMARY KEY ("numeroVersement")
);

-- AddForeignKey
ALTER TABLE "Versement" ADD CONSTRAINT "Versement_numeroCompteVersement_fkey" FOREIGN KEY ("numeroCompteVersement") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;
