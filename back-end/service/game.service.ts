import { ServiceError } from "../errors/ServiceError";
import { Game } from "../model/game";
import gameDb from "../repository/game.db";


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

export default {
    getAllGames,
    findGameByTitle
};