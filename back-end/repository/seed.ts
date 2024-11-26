import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const games = await prisma.game.createMany({
        data: [
            {
                title: 'Battle Arena',
                supportedLanguages: 'English, Korean, Chinese',
                price: 59.99,
                systemRequirements: '8GB RAM, GTX 1070, 40GB Storage',
                releaseDate: new Date('2023-02-14'),
                multiplayer: true,
            },
            {
                title: 'Adventure Quest',
                supportedLanguages: 'English, Spanish',
                price: 49.99,
                systemRequirements: '16GB RAM, RTX 2060, 50GB Storage',
                releaseDate: new Date('2023-03-01'),
                multiplayer: false,
            },
            {
                title: 'Space Explorer',
                supportedLanguages: 'English, French',
                price: 39.99,
                systemRequirements: '8GB RAM, GTX 1050, 30GB Storage',
                releaseDate: new Date('2023-01-20'),
                multiplayer: true,
            },
            {
                title: 'Mystery Mansion',
                supportedLanguages: 'English, German',
                price: 29.99,
                systemRequirements: '4GB RAM, Integrated Graphics, 20GB Storage',
                releaseDate: new Date('2023-04-10'),
                multiplayer: false,
            },
        ],
    });

    console.log(`${games.count} games created.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });