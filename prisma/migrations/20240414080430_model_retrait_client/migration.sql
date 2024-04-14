-- AddForeignKey
ALTER TABLE "Retrait" ADD CONSTRAINT "Retrait_numeroCompte_fkey" FOREIGN KEY ("numeroCompte") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;
