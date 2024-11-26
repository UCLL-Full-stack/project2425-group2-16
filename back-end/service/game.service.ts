import { ServiceError } from "../errors/ServiceError";
import { Game } from "../model/game";
import gameDb from "../repository/game.db";


const getAllGames = async (): Promise<Array<Game>> => {
	return await gameDb.getAllGames();
}

const findGameByTitle = async (title: string): Promise<Game | null> => {
    return await gameDb.findGameByTitle(title);
}

export default {
    getAllGames,
    findGameByTitle
};