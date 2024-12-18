import { PrismaClient } from '@prisma/client';
import { Game } from '../model/game';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Publishers
  const publisher1 = await prisma.publisher.create({
    data: {
      name: 'Epic Games',
      contactInformation: 'epicgames@example.com',
      overallRating: 5,
      dateOfFirstPublishing: new Date('1991-07-01'),
      country: 'USA',
      website: 'https://www.epicgames.com',
    },
  });

  const publisher2 = await prisma.publisher.create({
    data: {
      name: 'Ubisoft',
      contactInformation: 'ubisoft@example.com',
      overallRating: 4,
      dateOfFirstPublishing: new Date('1986-03-28'),
      country: 'France',
      website: 'https://www.ubisoft.com',
    },
  });

  // Seed Games
  const game1 = await prisma.game.create({
    data: {
      title: 'Fortnite',
      genre: 'Battle Royale',
      rating: 5,
      supportedLanguages: 'English, Spanish, French',
      price: 19.99,
      systemRequirements: 'Windows 7, 8, or 10, Intel Core i3, 4GB RAM',
      releaseDate: new Date('2017-07-25'),
      multiplayer: true,
      publisherId: publisher1.id,
    },
  });

  const game2 = await prisma.game.create({
    data: {
      title: 'Assassin\'s Creed',
      genre: 'Action-Adventure',
      rating: 4,
      supportedLanguages: 'English, French, Italian',
      price: 29.99,
      systemRequirements: 'Windows 7, 8, or 10, Intel Core i5, 8GB RAM',
      releaseDate: new Date('2007-11-13'),
      multiplayer: false,
      publisherId: publisher2.id,
    },
  });

  const game3 = await prisma.game.create({
    data: {
      title: 'Babje',
      genre: 'shooter',
      rating: 4,
      supportedLanguages: 'English, French, Italian',
      price: 20.99,
      systemRequirements: 'Windows 7, 8, or 10, Intel Core i5, 8GB RAM',
      releaseDate: new Date('2008-11-13'),
      multiplayer: false,
      publisherId: publisher2.id,
    },
  });

  const game4 = await prisma.game.create({
    data: {
      title: 'lawnmower simulator',
      genre: 'boring',
      rating: 4,
      supportedLanguages: 'English, French, Italian',
      price: 9.11,
      systemRequirements: 'Windows 7, 8, or 10, Intel Core i5, 8GB RAM',
      releaseDate: new Date('2005-11-13'),
      multiplayer: false,
      publisherId: publisher2.id,
    },
  });
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      // id: 1,
      username: 'gamer123',
      phoneNumber: 1234567890,
      emailAddress: 'gamer123@example.com',
      accountCreationDate: new Date(),
      birthDate: new Date('1987-01-01'),
      password: await bcrypt.hash('password123', 12),
      timeZone: 'UTC',
      country: 'USA',
      age: 34,
      role: 'standard',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'adventureFan',
      phoneNumber: 9876543210,
      emailAddress: 'adventureFan@example.com',
      birthDate: new Date('1985-06-10'),
      password: await bcrypt.hash('adventure123', 12),
      accountCreationDate: new Date(),
      timeZone: 'UTC',
      country: 'Canada',
      age: 39,
      role: 'moderator',
    },
  });

  const user3 = await prisma.user.create({
    data: { 
      username: 'ubisoftBoss',
      phoneNumber: 9876543210,
      emailAddress: 'ubisoftShelbik@example.com',
      birthDate: new Date('1985-06-10'),
      password: await bcrypt.hash('ubisoftShelbik', 12),
      accountCreationDate: new Date(),
      timeZone: 'UTC',
      country: 'Albania',
      age: 39,
      role: 'publisher',
      publisherId: publisher2.id,
    },
  })

  // Seed Purchases
  const purchase1 = await prisma.purchase.create({
    data: {
      userId: user1.id,
      gameId: game2.id,
      dateOfPurchase: new Date(),
      currency: 'USD',
      amountPayed: 19.99,
    },
  });



  console.log('Seed data has been added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
