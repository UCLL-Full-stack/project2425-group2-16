import { PrismaClient } from '@prisma/client'
import { FavoritesList } from '../model/favoritesList';
import { User } from '../model/user';
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


const findByUserId = async (userid: number) => {
    try {
        // Find the user first to get their ID
   

        // Then find favorites list by user ID
        const listPrisma = await database.favoritesList.findFirst({
            where: { 
                userId: userid
            },
        });

        return listPrisma;
    } catch (error) {
        console.error("Error fetching favorites list by username:", error);
        throw new Error("Database error while fetching favorites list");
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

        // Ensure user's favorites list exists or create one if not
        const existingFavoritesList = await prisma.favoritesList.findUnique({
            where: { userId: userId },
            include: { games: true }
        });

        // Start a transaction for atomic operations
        return await prisma.$transaction(async (prisma) => {
            // If no existing favorites list, create one
            const favoritesListRecord = existingFavoritesList 
                ? existingFavoritesList 
                : await prisma.favoritesList.create({
                    data: {
                        userId: userId,
                        description: "User's Game Favorites",
                        privacySettings: false, // Default privacy setting
                    }
                });

            // Prepare game IDs for junction table
            const gameIds = games.map(game => game.getId());

            // Remove existing game-list associations
            await prisma.favoritesListGame.deleteMany({
                where: { 
                    favoritesListId: favoritesListRecord.id 
                }
            });

            // Create new game-list associations
            const favoritesListGames = await prisma.favoritesListGame.createMany({
                data: gameIds.map(gameId => ({
                    favoritesListId: favoritesListRecord.id,
                    gameId: gameId
                })),
                // Skip duplicates if any
                skipDuplicates: true
            });

            return {
                favoritesList: favoritesListRecord,
                associatedGames: gameIds
            };
        });

    } catch (error) {
        // Comprehensive error logging
        // console.error("Favorites List Update Error:", {
        //     message: error.message,
        //     stack: error.stack,
        //     name: error.name,
        //     userId: userId
        // });

        // // Prisma-specific error handling
        // if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //     console.error("Prisma Error Details:", {
        //         code: error.code,
        //         meta: error.meta
        //     });
        // }

        // Rethrow to allow caller to handle
        throw error;
    } finally {
        // Ensure connection is closed
        await prisma.$disconnect();
    }
};
        // const updatedFavoritesList = await prisma.$transaction(async (tx) => {
        //     // Update the scalar fields of FavoritesList
        //     const updatedList = await tx.favoritesList.update({
        //         where: { id: list.getId() },
        //         data: {
        //             privacySettings: list.getPrivacySettings(),
        //             description: list.getDescription(),
        //         },
        //     });

        //     // Cleanly handle the many-to-many relationship update
        //     // Delete existing relations first
        //     await tx.favoritesListGame.deleteMany({
        //         where: { favoritesListId: list.getId() },
        //     });

        //     // Insert new relations, assuming favoritesListId and gameId are defined
        //     await tx.favoritesListGame.createMany({
        //         data: games.map((game) => ({
        //             favoritesListId: list.getId() as number,
        //             gameId: game.getId() as number,
        //         })),
        //     });

        //     return updatedList;
        // });

        // return updatedFavoritesList;



export default {
    findByUserId,
    updateFavoritesList,
    save
};