-- CreateTable
CREATE TABLE "Caissier" (
    "numeroCaissier" TEXT NOT NULL,
    "nomCaissier" TEXT NOT NULL,
    "prenomsCaissier" TEXT NOT NULL,
    "numeroCaisse" TEXT NOT NULL,
    "emailCaissier" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephoneCaissier" TEXT NOT NULL,

    CONSTRAINT "Caissier_pkey" PRIMARY KEY ("numeroCaissier")
);
