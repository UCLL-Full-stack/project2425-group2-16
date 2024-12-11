import express, { Request, Response } from "express";
import userService from '../service/user.service'; // Check this path
import favoritesListService from '../service/list.service'; // Check this path
import { ListInput } from "../types";

const router = express.Router();



router.put('/add', async (req: Request, res: Response) => {
    try {
        // Extract username and gameId from query parameters
        // This follows the specified URL pattern: /favorites/add?username=<username>&gameId=<id>
        const { username, gameId } = req.query as unknown as ListInput;

        // Perform rigorous validation of query parameters
        // Checks that both username and gameId are:
        // 1. Present (not undefined or null)
        // 2. Non-empty strings
        // 3. Trimmed to remove any potential whitespace
        // if (!username || !gameId || 
        //     typeof username !== 'string' || 
        //     typeof gameId !== 'string' || 
        //     username.trim() === '' || 
        //     gameId.trim() === '') {
        //     return res.status(400).json({ 
        //         error: "Valid username and gameId are required.",
        //         details: {
        //             username: username ? "Provided" : "Missing",
        //             gameId: gameId ? "Provided" : "Missing"
        //         }
        //     });
        // }

        //broski, not gud not gud
        //NEVER put business logic in controller
        //tbh if therer exists the possibility of either the username or the gameId being null, you should test that in the frontend first
        //also, in what situation would the username be null? there will ALWAYS be a username that exists if a user is pressing the button,
        //because a user HAS to be logged in to add the game to their favorites
        //Same thing with the game lol, if the user is viewing the game then the game MUST exist on the database
        //Little wall of text for you here lmao

        // Call the service method to add the game to favorites
        // This method is expected to:
        // 1. Validate the username exists in the system
        // 2. Validate the gameId is a valid game
        // 3. Add the game to the user's favorites list
        // 4. Return the updated list of favorites
        const updatedFavorites = await favoritesListService.addGameToFavorites(
            username.trim(), 
            Number(gameId)
        );

        // Successfully added the game
        // Return 200 status with the updated favorites list
        return res.status(200).json(updatedFavorites);

    } catch (error) {
        // Log the full error for server-side debugging
        console.error('Error adding game to favorites:', error);

        // Provide a generic error response to the client
        // Avoids exposing sensitive system details
        return res.status(500).json({ 
            error: 'Failed to add game to favorites',
            // Optionally, include a more informative message if appropriate
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});




router.get('/getList', async (req: Request, res: Response) => {
    try {
        // 1. Extract username from query parameters
        const username = req.query.username as string;

        if (!username) {
            return res.status(400).json({ 
                message: "Username is required" 
            });
        }

        // 2. Fetch user by username from the database
        const user = await userService.findByUsername(username);
        
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        // 3. Fetch favorites list from database for that user
        const favoritesList = await favoritesListService.fetchByUsername(username);

        // 4. Return the favorites list
        res.status(200).json(favoritesList);

    } catch (error) {
        console.error("Error fetching favorites list:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
});

export default router;