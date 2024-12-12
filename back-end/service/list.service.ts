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

const addGameToFavorites = async (username: string, gameId: number): Promise<{ message: string; favoritesListId?: number }> => {
    try {
        // Fetch the user
        const userPlain = await userDb.getUserByUsername(username);
        if (!userPlain) {
            throw new Error("User not found");
        }
        const realUser = User.from(userPlain);
        const userId = realUser.id;

        // Fetch the game
        const gamePlain = await gameDb.findById(gameId);
        if (!gamePlain) {
            throw new Error(`Game with ID "${gameId}" not found`);
        }
        const game = Game.from(gamePlain);

        // Fetch or create the favorites list
        const plainObject = await favoritesListDb.findByUserId(userId);
        let favoritesListReal;
        if (!plainObject) {
            // If there is no favorites list, create a new one
            const newList = new FavoritesList({
                privacySettings: true,
                description: "",
                owner: realUser,
                games: [game],
            });
            realUser.setFavoritesList(newList);
            await favoritesListDb.save(newList);
            await userDb.saveUser(realUser);

            favoritesListReal = newList;
        } else {
            favoritesListReal = await FavoritesList.fromObjectAsync(plainObject);
            favoritesListReal.addGame(game);

            // Optionally persist the updated list back to the database
            await favoritesListDb.updateFavoritesList(favoritesListReal, realUser.id);
        }

        // Return success message and optional favorites list ID
        return {
            message: `Game with ID "${gameId}" successfully added to favorites!`,
            favoritesListId: favoritesListReal.id, // Assuming `id` exists on `FavoritesList`
        };
    } catch (error) {
        throw new Error("Failed to add game to favorites. Please try again later.");
    }
};




export default {
    fetchByUsername,
    addGameToFavorites
};

