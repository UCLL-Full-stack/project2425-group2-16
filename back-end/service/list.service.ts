import { FavoritesList } from "../model/favoritesList";
import { Game } from "../model/game";
import { User } from "../model/user";
import favoritesListDb from "../repository/favoritesList.db";
import gameDb from "../repository/game.db";
import userDb from "../repository/user.db";

const fetchByUsername = async (username: string): Promise<FavoritesList | null> => {
    // const user = await database.user.findUnique({
    //     where: { username },
    // });


    const userPlain = await userDb.getUserByUsername(username);
    if (!userPlain) {
        return null; // or throw an error if user not found
    } 
    const realUser = User.from(userPlain);

    
    const userId = realUser.id;
    const plainObject = await favoritesListDb.findByUserId(userId);

    if (!plainObject) {
        return null;
    }

    return FavoritesList.fromObjectAsync(plainObject)
};

const addGameToFavorites = async (username: string, gameId: number): Promise<void> => { 
    try {

        const userPlain = await userDb.getUserByUsername(username);
        if (!userPlain) {
            throw new Error("user not found")
        }
        const realUser = User.from(userPlain);
        const userId = realUser.id;




        // Fetch the favorites list
        const plainObject = await favoritesListDb.findByUserId(userId);
        if (!plainObject) {
            throw new Error(`Favorites list for username "${username}" not found`);
        }
        const favoritesListReal = await FavoritesList.fromObjectAsync(plainObject);

        // Fetch the game
        const gamePlain = await gameDb.findById(gameId);
        if (!gamePlain) {
            throw new Error(`Game with ID "${gameId}" not found`);
        }
        const game = Game.from(gamePlain);

        // Add the game to the favorites list
        favoritesListReal.addGame(game);

        // Optionally persist the updated list back to the database
        await favoritesListDb.updateFavoritesList(favoritesListReal); // Assumes a `save` method exists in `favoritesListDb`
    } catch (error) {
        console.error(`Error adding game to list`);
        throw error; // Re-throw the error to let the caller handle it
    }
};

export default {
    fetchByUsername,
    addGameToFavorites
};

