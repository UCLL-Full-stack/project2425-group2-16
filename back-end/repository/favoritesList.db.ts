import { Prisma, PrismaClient } from '@prisma/client'
import { FavoritesList } from '../model/favoritesList';
import { User } from '../model/user';
import { Game } from '../model/game';
import userDb from './user.db';

const database = new PrismaClient()
const prisma = new PrismaClient();





const save = async (favoritesList: FavoritesList) => {
    try {
      const newFavoritesList = await prisma.favoritesList.create({
        data: {
          privacySettings: favoritesList.privacySettings,
          description: favoritesList.description,
          userId: favoritesList.owner.id,  // Use owner.id to get the userId
          games: {
            create: favoritesList.games.map(game => ({
              gameId: game.id  // Create relations in the junction table
            })),
          },
        },
      });
      return newFavoritesList;
    } catch (error) {
      console.error('Error saving favorites list:', error);
      throw new Error('Error saving favorites list');
    }
  };

  const findByUserId = async (userId: number): Promise<FavoritesList | null> => {
    try {
        // Use Prisma client directly instead of raw SQL
        const favoritesListRecord = await prisma.favoritesList.findUnique({
            where: { 
                userId: userId 
            },
            include: {
                games: {
                    include: {
                        game: true // Include the full game details
                    }
                },
                owner: true // Include the user details
            }
        });

        // If no favorites list found, return null
        if (!favoritesListRecord) {
            return null;
        }

        // Transform the Prisma result to your domain model
        const games = favoritesListRecord.games.map(gameAssoc => 
            new Game({
                id: gameAssoc.game.id,
                title: gameAssoc.game.title,
                genre: gameAssoc.game.genre,
                rating: gameAssoc.game.rating,
                supportedLanguages: gameAssoc.game.supportedLanguages,
                price: gameAssoc.game.price,
                systemRequirements: gameAssoc.game.systemRequirements,
                releaseDate: gameAssoc.game.releaseDate,
                multiplayer: gameAssoc.game.multiplayer,
                publisherId: gameAssoc.game.publisherId
            })
        );

        // Create the FavoritesList instance
        return new FavoritesList({
            id: favoritesListRecord.id,
            privacySettings: favoritesListRecord.privacySettings,
            description: favoritesListRecord.description,
            owner: User.from(favoritesListRecord.owner),
            games: games
        });

    } catch (error) {
        console.error("Error fetching favorites list by userId:", error);
        throw new Error("Database error while fetching favorites list");
    }
};
const replaceFavoritesList = async (list: FavoritesList): Promise<FavoritesList> => {
    try {
        const updatedFavoritesList = await prisma.favoritesList.update({
            where: { id: list.id },
            data: {
                privacySettings: list.privacySettings,
                description: list.description,
                userId: list.owner.id, // Update the owner ID if necessary
                games: {
                    // This assumes you want to replace the existing games
                    deleteMany: {}, // Remove all existing associations
                    create: list.games.map(game => ({
                        gameId: game.id // Assuming you have a gameId field in the junction table
                    }))
                }
            }
        });

        // Create a new instance of FavoritesList using the updated data
        const favoritesListInstance = new FavoritesList({
            id: updatedFavoritesList.id,
            privacySettings: updatedFavoritesList.privacySettings,
            description: updatedFavoritesList.description,
            owner: list.owner, // Assuming you have the owner object available
            games: list.games // You may want to fetch the games again if needed
        });

        return favoritesListInstance; // Return the mapped instance
    } catch (error) {
        console.error("Error replacing favorites list:", error);
        throw new Error("Database error while replacing favorites list");
    }
};

const updateFavoritesList = async (list: FavoritesList, userId: number) => {
    try {
        // Validate input games
        const games = list.getGames();
        if (!games || games.length === 0) {
            throw new Error("No games can be added to the favorites list.");
        }

        // Validate game IDs
        const invalidGames = games.filter(game => game.getId() === undefined);
        if (invalidGames.length > 0) {
            throw new Error(
                `Invalid games detected. Some games have no ID: ${invalidGames.map(g => g.getTitle()).join(", ")}`
            );
        }

        // Start a transaction for atomic operations
        return await prisma.$transaction(async (transactionPrisma) => {
            // Find or create the favorites list for the user
            const favoritesListRecord = await transactionPrisma.favoritesList.upsert({
                where: { userId: userId },
                update: {}, // No updates needed
                create: {
                    userId: userId,
                    description: "User's Game Favorites",
                    privacySettings: false // Default privacy setting
                }
            });

            // Prepare game IDs for junction table
            const gameIds = games.map(game => game.getId());

            // Remove existing game-list associations
            await transactionPrisma.favoritesListGame.deleteMany({
                where: { 
                    favoritesListId: favoritesListRecord.id 
                }
            });

            // Create new game-list associations
            await transactionPrisma.favoritesListGame.createMany({
                data: gameIds.map(gameId => ({
                    favoritesListId: favoritesListRecord.id,
                    gameId: gameId
                }))
            });

            return {
                favoritesList: favoritesListRecord,
                associatedGames: gameIds
            };
        });

    } catch (error) {
        console.error("Favorites List Update Error:", {
            userId: userId,
            // errorMessage: error.message,
            // stack: error.stack
        });

        throw error;
    }
};





export default {
    findByUserId,
    updateFavoritesList,
    save, 
    replaceFavoritesList
};