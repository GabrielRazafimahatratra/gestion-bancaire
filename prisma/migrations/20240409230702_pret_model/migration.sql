-- CreateTable
CREATE TABLE "Pret" (
    "numeroPret" TEXT NOT NULL,
    "numeroCompte" TEXT NOT NULL,
    "montantPret" DECIMAL(65,30) NOT NULL,
    "tauxPret" DECIMAL(65,30) NOT NULL,
    "delaiPret" TIMESTAMP(3) NOT NULL,
    "datePret" TIMESTAMP(3) NOT NULL,
    "montantARendre" DECIMAL(65,30) NOT NULL,
    "emprunteurId" TEXT NOT NULL,

    CONSTRAINT "Pret_pkey" PRIMARY KEY ("numeroPret")
);

-- AddForeignKey
ALTER TABLE "Pret" ADD CONSTRAINT "Pret_emprunteurId_fkey" FOREIGN KEY ("emprunteurId") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;
