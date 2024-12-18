import { ServiceError } from "../errors/ServiceError";
import { Game } from "../model/game";
import gameDb from "../repository/game.db";
import userDb from "../repository/user.db";


const getAllGames = async (): Promise<Array<Game>> => {
	return await gameDb.getAllGames();
}

const findGameByTitle = async (title: string): Promise<Game | null> => {
    const games = await gameDb.getAllGames();

    if (games){
    for (const game of games) {
        if (game.title === title) {
            return game;
        }
    }
    return null;
    }
    return null;
}


const deleteGame = async (id: number): Promise<void> => {
    try { 
        const purchasedGames = await gameDb.findPurchasedGames();
        if (purchasedGames.some(((gameId) => gameId === id))){
            throw new Error("game can not be deleted, it is purchased by someone")
        }
        await gameDb.deleteGame(id);
    } catch (error) { 
        // console.error('Error in deleteGame:', error);
        // Re-throw the error to propagate it back to the caller
        if (error instanceof Error) {
            throw error; // Maintain the original error message
        } else {
            throw new Error('Unexpected error occurred in deleteGame');
        }
    }
        
}

const fetchPurchasedForUser = async (username: string): Promise<Game[]> => { 
    const user = await userDb.findByUsername(username);
    const id = user ? user.getId() : null;
    if (id == null) { 
        throw new Error("service layer was unable to find id")    }
    const purchasedGames = await gameDb.findPurchased(id);
    if (!purchasedGames) { 
       throw new Error("service did not receive fetched games from database")
    }
    return purchasedGames;
}



export default {
    fetchPurchasedForUser,
    getAllGames,
    findGameByTitle,
    deleteGame
};