import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const pretsData = [
    
    
      {
        numeroPret: "Pret006",
        montantPret: 250000,
        tauxPret: 1.7,
        delaiPret: 8,
        datePret: new Date("2024-02-15T00:00:00.000Z"),
        montantARendre: 425000,
        restePret: 157200,
        numeroCompteEmprunteur: "00086-0000000005-81"
      },
      {
        numeroPret: "Pret007",
        montantPret: 900000,
        tauxPret: 2.2,
        delaiPret: 14,
        datePret: new Date("2024-01-30T00:00:00.000Z"),
        montantARendre: 1980000,
        restePret: 1000000,
        numeroCompteEmprunteur: "00086-0000000006-81"
      },
      {
        numeroPret: "Pret008",
        montantPret: 655000,
        tauxPret: 1.9,
        delaiPret: 13,
        datePret: new Date("2024-03-20T00:00:00.000Z"),
        montantARendre: 1244500,
        restePret: 900000,
        numeroCompteEmprunteur: "00086-0000000007-81"
      },
      {
        numeroPret: "Pret009",
        montantPret: 1800000,
        tauxPret: 2.1,
        delaiPret: 20,
        datePret: new Date("2024-02-10T00:00:00.000Z"),
        montantARendre: 3780000,
        restePret: 3000000,
        numeroCompteEmprunteur: "00086-0000000008-81"
      },
      {
        numeroPret: "Pret010",
        montantPret: 110000,
        tauxPret: 1.5,
        delaiPret: 6,
        datePret: new Date("2024-01-18T00:00:00.000Z"),
        montantARendre: 165000,
        restePret: 117150,
        numeroCompteEmprunteur: "00086-000000009-81"
      },
      {
        numeroPret: "Pret011",
        montantPret: 850000,
        tauxPret: 1.8,
        delaiPret: 5,
        datePret: new Date("2024-03-12T00:00:00.000Z"),
        montantARendre: 1530000,
        restePret: 489420,
        numeroCompteEmprunteur: "00086-0000000010-81"
      },
      
];

export const seedPrets = async () => {
    try {
        await prisma.pret.createMany({
          data: pretsData,
          skipDuplicates: true, 
        });
        console.log('Données de prêts insérées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de prêts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

