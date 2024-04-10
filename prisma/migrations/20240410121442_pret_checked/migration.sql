/*
  Warnings:

  - Changed the type of `delaiPret` on the `Pret` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pret" DROP COLUMN "delaiPret",
ADD COLUMN     "delaiPret" INTEGER NOT NULL,
ALTER COLUMN "datePret" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "datePret" SET DATA TYPE DATE;
