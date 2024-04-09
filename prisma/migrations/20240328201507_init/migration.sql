-- CreateTable
CREATE TABLE "Client" (
    "numeroCompte" TEXT NOT NULL,
    "nomClient" TEXT NOT NULL,
    "prenomsClient" TEXT NOT NULL,
    "addresseClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "telephoneClient" TEXT NOT NULL,
    "montantClient" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("numeroCompte")
);
