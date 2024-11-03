import { ServiceError } from "../errors/ServiceError";
import { Game } from "../model/game";
import gameDb from "../repository/game.db";


const getAllGames = (): Array<Game> => {
	return gameDb.getAllGames();
}


export default {
    getAllGames
};