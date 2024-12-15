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


const replace = async (username: string, gameId: number): Promise<FavoritesList> => {
    try { 
        const plain = await fetchByUsername(String(username));
        
        if (plain == null) { 
            throw new Error("No list was found for the user");
        }

        const favoritesList = FavoritesList.from(plain);
        const games = favoritesList.getGames();
        const updatedGames = games.filter((game) => game.getId() !== Number(gameId));
        favoritesList.setGames(updatedGames);

        // Assuming replaceFavoritesList returns a FavoritesList instance
        const updatedFavoritesList = await favoritesListDb.replaceFavoritesList(favoritesList);
        
        return updatedFavoritesList; // Return the updated list
    } catch (error) {
        console.error("Error replacing game in favorites list:", error);
        throw new Error("Database error while replacing game in favorites list");
    }
};
const addGameToFavorites = async (username: string, gameId: number): Promise<{ message: string; favoritesList: FavoritesList }> => {
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

        // Check if game is already in favorites
        const plainObject = await favoritesListDb.findByUserId(userId);

        let favoritesList: FavoritesList;

        if (!plainObject) {
            // If there is no favorites list, create a new one
            favoritesList = new FavoritesList({
                privacySettings: true,
                description: "",
                owner: realUser,
                games: [game],
            });
            realUser.setFavoritesList(favoritesList);
            await favoritesListDb.save(favoritesList);
            await userDb.saveUser(realUser);
        } else {
            // Use the fromObjectAsync method to create a class instance
            favoritesList = await FavoritesList.fromObjectAsync(plainObject);
            
            // Check if game is already in favorites
            const isGameAlreadyInFavorites = favoritesList.games.some(
                existingGame => existingGame.id === gameId
            );

            if (isGameAlreadyInFavorites) {
                return {
                    message: `Game with ID "${gameId}" is already in favorites.`,
                    favoritesList
                };
            }

            // Use the class method to add the game
            favoritesList.addGame(game);

            // Persist the updated list back to the database
            await favoritesListDb.updateFavoritesList(favoritesList, realUser.id);
        }

        // Fetch the updated favorites list with related games
        const updatedFavoritesList = await favoritesListDb.findByUserId(userId);

        if (!updatedFavoritesList) {
            throw new Error("Failed to retrieve updated favorites list.");
        }

        // Return success message and favorites list
        return {
            message: `Game with ID "${gameId}" successfully added to favorites!`,
            favoritesList: updatedFavoritesList
        };
    } catch (error) {
        // Log the actual error for debugging
        console.error("Error in addGameToFavorites:", error);
        
        // Throw a more generic error for the client
        throw new Error("Failed to add game to favorites. Please try again later.");
    }
};






export default {
    fetchByUsername,
    addGameToFavorites,
    replace
};

