import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const remboursementData = [
    {
        idRemboursement: "Remboursement001",   
        montantAPayer: 50000,             
        numeroCompteVerseur: "00086-0000000005-81",        
        numeroPretPourLeRemboursement: "Pret001", 
        numeroCompteDeLaBanque: "00002-10101140005-81"        
    },
    {
        idRemboursement: "Remboursement001",   
        montantAPayer: 50000,             
        numeroCompteVerseur: "00086-0000000006-81",        
        numeroPretPourLeRemboursement: "Pret002", 
        numeroCompteDeLaBanque: "00002-10101140005-81"        
    },
    {
        idRemboursement: "Remboursement001",   
        montantAPayer: 150000,             
        numeroCompteVerseur: "00086-0000000007-81",        
        numeroPretPourLeRemboursement: "Pret003", 
        numeroCompteDeLaBanque: "00002-10101140005-81"        
    },
    {
        idRemboursement: "Remboursement001",   
        montantAPayer: 250000,             
        numeroCompteVerseur: "00086-0000000006-81",        
        numeroPretPourLeRemboursement: "Pret002", 
        numeroCompteDeLaBanque: "00002-10101140005-81"        
    },
];
export const seedRemboursementPrets = async () => {
    try {
        await prisma.remboursementPret.createMany({
          data: remboursementData,
          skipDuplicates: true, 
        });
        console.log('Données de remboursement insérées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données de remboursement:', error);
    } finally {
        await prisma.$disconnect();
    }
}