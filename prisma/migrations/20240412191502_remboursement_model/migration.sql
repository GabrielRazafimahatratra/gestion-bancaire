/*
  Warnings:

  - You are about to drop the column `idPret` on the `RemboursementPret` table. All the data in the column will be lost.
  - Added the required column `numeroCompte` to the `RemboursementPret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroPret` to the `RemboursementPret` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RemboursementPret" DROP CONSTRAINT "RemboursementPret_idPret_fkey";

-- DropIndex
DROP INDEX "RemboursementPret_idPret_key";

-- AlterTable
ALTER TABLE "RemboursementPret" DROP COLUMN "idPret",
ADD COLUMN     "numeroCompte" TEXT NOT NULL,
ADD COLUMN     "numeroPret" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroCompte_fkey" FOREIGN KEY ("numeroCompte") REFERENCES "Client"("numeroCompte") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RemboursementPret" ADD CONSTRAINT "RemboursementPret_numeroPret_fkey" FOREIGN KEY ("numeroPret") REFERENCES "Pret"("numeroPret") ON DELETE RESTRICT ON UPDATE CASCADE;
