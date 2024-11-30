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



export default {
    getAllGames,
};