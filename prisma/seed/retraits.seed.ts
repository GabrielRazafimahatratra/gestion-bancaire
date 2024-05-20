import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const retraitsData = [
    {
        numeroRetraits: "Retrait001",
        numeroCompte: "00086-0000000001-81",
        montantRetrait: 200000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait002",
        numeroCompte: "00086-0000000003-81",
        montantRetrait: 200000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait003",
        numeroCompte: "00086-0000000004-81",
        montantRetrait: 250000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait004",
        numeroCompte: "00086-0000000006-81",
        montantRetrait: 330000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait005",
        numeroCompte: "00086-0000000002-81",
        montantRetrait: 1000000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait006",
        numeroCompte: "00086-0000000009-81",
        montantRetrait: 2100000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait007",
        numeroCompte: "00086-0000000008-81",
        montantRetrait: 200000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait008",
        numeroCompte: "00086-0000000009-81",
        montantRetrait: 50000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait009",
        numeroCompte: "00086-0000000008-81",
        montantRetrait: 70000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait010",
        numeroCompte: "00086-0000000005-81",
        montantRetrait: 120000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
    {
        numeroRetraits: "Retrait011",
        numeroCompte: "00086-0000000006-81",
        montantRetrait: 90000,
        dateRetrait: new Date("2024-02-08T00:00:00.000Z")
    },
];
export const seedRetraits = async () => {
    try {
        await prisma.retrait.createMany({
          data: retraitsData,
          skipDuplicates: true, 
        });
        console.log('Données de retraits insérées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de retraits:', error);
    } finally {
        await prisma.$disconnect();
    }
}