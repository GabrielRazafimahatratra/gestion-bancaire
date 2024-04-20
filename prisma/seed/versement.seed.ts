import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const versementData = [
    {
        numeroVersement: "Versement002",
        numeroCompteVersement: "00086-0000000003-81",
        montantVersement: 305000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Jean",
        prenomsVerseur: "Paul"
    },
    {
        numeroVersement: "Versement003",
        numeroCompteVersement: "00086-0000000006-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Thomas",
        prenomsVerseur: "Marc"
    },
    {
        numeroVersement: "Versement004",
        numeroCompteVersement: "00086-0000000005-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Alice",
        prenomsVerseur: "Marie"
    },
    {
        numeroVersement: "Versement005",
        numeroCompteVersement: "00086-0000000007-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Emma",
        prenomsVerseur: "Lucie"
    },
    {
        numeroVersement: "Versement006",
        numeroCompteVersement: "00086-0000000008-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Lucas",
        prenomsVerseur: "Hugo"
    },
    {
        numeroVersement: "Versement007",
        numeroCompteVersement: "00086-0000000009-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Lea",
        prenomsVerseur: "Camille"
    },
    {
        numeroVersement: "Versement008",
        numeroCompteVersement: "00086-0000000004-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Maxime",
        prenomsVerseur: "Antoine"
    },
    {
        numeroVersement: "Versement009",
        numeroCompteVersement: "00086-0000000007-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Chloe",
        prenomsVerseur: "Agnès"
    },
    {
        numeroVersement: "Versement010",
        numeroCompteVersement: "00086-0000000009-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Nathalie",
        prenomsVerseur: "Queen"
    },
    {
        numeroVersement: "Versement011",
        numeroCompteVersement: "00086-0000000006-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "RABE",
        prenomsVerseur: "Christophe"
    },
    {
        numeroVersement: "Versement012",
        numeroCompteVersement: "00086-0000000011-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Léonie",
        prenomsVerseur: "Alexandrine"
    },
    {
        numeroVersement: "Versement013",
        numeroCompteVersement: "00086-0000000010-81",
        montantVersement: 3050000,
        dateVersement: "2024-04-15T18:35:25.591Z",
        nomVerseur: "Benjamin",
        prenomsVerseur: "Christophe"
    }
];

export const seedVersement = async () => {
    try {
        await prisma.versement.createMany({
          data: versementData,
          skipDuplicates: true, 
        });
        console.log('Données de versement insérées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de versement:', error);
    } finally {
        await prisma.$disconnect();
    }
}