-- CreateTable
CREATE TABLE "Virement" (
    "numeroVirement" TEXT NOT NULL,
    "numeroCompteDestinataire" TEXT NOT NULL,
    "numeroCompteExpediteur" TEXT NOT NULL,
    "montantVirement" DECIMAL(65,30) NOT NULL,
    "dateVirement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Virement_pkey" PRIMARY KEY ("numeroVirement")
);

-- CreateIndex
CREATE UNIQUE INDEX "Virement_numeroCompteDestinataire_numeroCompteExpediteur_key" ON "Virement"("numeroCompteDestinataire", "numeroCompteExpediteur");

-- AddForeignKey
ALTER TABLE "Virement" ADD CONSTRAINT "Virement_numeroCompteDestinataire_fkey" FOREIGN KEY ("numeroCompteDestinataire") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Virement" ADD CONSTRAINT "Virement_numeroCompteExpediteur_fkey" FOREIGN KEY ("numeroCompteExpediteur") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;
