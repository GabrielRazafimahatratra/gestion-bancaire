import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const clientsData = [

    {
        numeroCompte: "00086-0000000001-81",
        nomClient: "Randriamanantena",
        prenomsClient: "Harivola",
        addresseClient: "Analakely",
        emailClient: "harivola@example.com",
        telephoneClient: "0349983392",
        montantClient: 4800000
    },
    {
        numeroCompte: "00086-0000000002-81",
        nomClient: "Rasoamanarivo",
        prenomsClient: "Joséphine",
        addresseClient: "Ambohidratrimo",
        emailClient: "josephine@example.com",
        telephoneClient: "0349983393",
        montantClient: 6200000
    },
    {
        numeroCompte: "00086-0000000003-81",
        nomClient: "Rafalimanana",
        prenomsClient: "Justin",
        addresseClient: "Ivandry",
        emailClient: "justin@example.com",
        telephoneClient: "0349983394",
        montantClient: 7100000
    },
    {
        numeroCompte: "00086-0000000004-81",
        nomClient: "Rasoaharisoa",
        prenomsClient: "Aina",
        addresseClient: "Ambohipo",
        emailClient: "aina@example.com",
        telephoneClient: "0349983395",
        montantClient: 3900000
    },
    {
        numeroCompte: "00086-0000000005-81",
        nomClient: "Andriamahazo",
        prenomsClient: "Tianarivelo",
        addresseClient: "Amboditsiry",
        emailClient: "tianarivelo@example.com",
        telephoneClient: "0349983396",
        montantClient: 5700000
    },
    {
        numeroCompte: "00086-0000000006-81",
        nomClient: "Razafimandimby",
        prenomsClient: "Rivo",
        addresseClient: "Ankatso",
        emailClient: "rivo@example.com",
        telephoneClient: "0349983397",
        montantClient: 4200000
    },
    {
        numeroCompte: "00086-0000000007-81",
        nomClient: "Rasoamanana",
        prenomsClient: "Fitia",
        addresseClient: "Isotry",
        emailClient: "fitia@example.com",
        telephoneClient: "0349983398",
        montantClient: 6800000
    },
    {
        numeroCompte: "00086-0000000008-81",
        nomClient: "Rabenjanahary",
        prenomsClient: "Faniry",
        addresseClient: "Ankadifotsy",
        emailClient: "faniry@example.com",
        telephoneClient: "0349983399",
        montantClient: 5100000
    },
    {
        numeroCompte: "00086-0000000009-81",
        nomClient: "Ramaroson",
        prenomsClient: "Tahiry",
        addresseClient: "Andoharanofotsy",
        emailClient: "tahiry@example.com",
        telephoneClient: "0349983300",
        montantClient: 4500000
    }
];

export const seedClients = async () => {
    try {
      await prisma.client.createMany({
        data: clientsData,
        skipDuplicates: true, 
      });
      console.log('Données de clients insérées avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'insertion des données de clients:', error);
    } finally {
      await prisma.$disconnect();
    }
};