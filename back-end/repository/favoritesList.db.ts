import { PrismaClient } from '@prisma/client'
import { FavoritesList } from '../model/favoritesList';
import { User } from '../model/user';
const database = new PrismaClient()
const prisma = new PrismaClient();


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


const updateFavoritesList = async (list: FavoritesList) => {
    try {
        // Ensure games are present before processing
        const games = list.getGames();
        if (!games || games.length === 0) {
            throw new Error("No games provided for the favorites list update.");
        }

        const updatedFavoritesList = await prisma.$transaction(async (tx) => {
            // Update the scalar fields of FavoritesList
            const updatedList = await tx.favoritesList.update({
                where: { id: list.getId() },
                data: {
                    privacySettings: list.getPrivacySettings(),
                    description: list.getDescription(),
                },
            });

            // Cleanly handle the many-to-many relationship update
            // Delete existing relations first
            await tx.favoritesListGame.deleteMany({
                where: { favoritesListId: list.getId() },
            });

            // Insert new relations
            await tx.favoritesListGame.createMany({
                data: games.map((game) => ({
                    favoritesListId: list.getId(),
                    gameId: game.getId(),
                })),
            });

            return updatedList;
        });

        return updatedFavoritesList;
    } catch (error) {
        // Provide more context in error handling
        console.error("Error updating favorites list:", error);
        // throw new Error(`Failed to update favorites list with id ${list.getId()}: ${error.message}`);
    }
};



export default {
    findByUserId,
    updateFavoritesList
};