-- CreateTable
CREATE TABLE "Retrait" (
    "numeroRetraits" TEXT NOT NULL,
    "numeroCompte" TEXT NOT NULL,
    "montantRetrait" DECIMAL(65,30) NOT NULL,
    "dateRetrait" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retrait_pkey" PRIMARY KEY ("numeroRetraits")
);
