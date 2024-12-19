import { Prisma } from "@prisma/client";
import { Game } from "../model/game";
import database from '../util/database';

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamesPrisma = await database.game.findMany();
        return gamesPrisma.map((gamesPrisma) => Game.from(gamesPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteGame = async (id: number): Promise<void> => { 
    try {
        await database.game.delete({
            where: { id: id},

        });
    } catch (error) {
        console.error(`Error deleting game: ${id}`, error);
    }
};


const findById = async (id: number): Promise<Game> => { 
    try {
        const gamePrisma = await database.game.findFirst({
            where: { id: id }, 
        });

        if (!gamePrisma) {
            throw new Error(`Game with ID ${id} not found`);
        }

        return Game.from(gamePrisma); // Assuming `Game.from` converts the Prisma object to a Game instance
    } catch (error) {
        console.error(`Error finding game by ID: ${id}`, error);
        throw error; // Re-throw the error to propagate it
    }
};

const findPurchasedGames = async (): Promise<number[]> => { 
    try {
      const purchasedGames = await database.purchase.findMany({
        select: { 
          gameId: true
        }
      });
      
      // Map the results to an array of game IDs
      return purchasedGames.map(purchase => purchase.gameId);
    
    } catch (error) { 
        console.error("Database error:", error);
        throw new Error("Database error");
    }
}

const findPurchased = async (userId: number): Promise<Game[] | null> => {
    try {
        // Use Prisma client directly instead of raw SQL
        const purchasedGames = await database.purchasedGameUser.findMany({
            where: { 
                userId: userId 
            },
            include: {
                game: true,
                 
            }
        });

        // If no favorites list found, return null
        if (!purchasedGames) {
            return null;
        }

        // Transform the Prisma result to your domain model
        const games = purchasedGames.map(gameAssoc => 
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
        return games;



    } catch (error) {
        console.error("Error fetching favorites list by userId:", error);
        throw new Error("Database error while fetching favorites list");
    }
};



export default {
    findPurchasedGames,
    findPurchased,
    getAllGames,
    findById,
    deleteGame
};