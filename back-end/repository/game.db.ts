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

const deleteGame = async (title: string): Promise<void> => { 
    try {
        await database.game.delete({
            where: { title } as Prisma.GameWhereUniqueInput
        });
    } catch (error) {
        console.error(`Error deleting game: ${title}`, error);
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

export default {
    getAllGames,
    findById,
    deleteGame
};