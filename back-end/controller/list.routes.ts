/**
 * @swagger
 * tags:
 *   name: FavoritesList
 *   description: API for managing user's favorite games list
 */

/**
 * @swagger
 * /remove:
 *   put:
 *     summary: Remove a game from the user's favorites list
 *     tags: [FavoritesList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *       - in: query
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the game to remove
 *     responses:
 *       200:
 *         description: Successfully removed the game from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedList:
 *                   $ref: '#/components/schemas/FavoritesList'
 *       400:
 *         description: Missing username or gameId
 *       500:
 *         description: Error removing game from favorites
 */

/**
 * @swagger
 * /add:
 *   put:
 *     summary: Add a game to the user's favorites list
 *     tags: [FavoritesList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *       - in: query
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the game to add
 *     responses:
 *       200:
 *         description: Successfully added the game to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedFavoritesList:
 *                   $ref: '#/components/schemas/FavoritesList'
 *       400:
 *         description: Missing username or gameId
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /getList:
 *   get:
 *     summary: Get the user's favorites list
 *     tags: [FavoritesList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: Successfully fetched the favorites list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoritesList'
 *       400:
 *         description: Username is required
 *       404:
 *         description: User not found or No favorites list found for this user
 *       500:
 *         description: Internal server error
 */


import express, { Request, Response } from "express";
import userService from '../service/user.service'; // Check this path
import favoritesListService from '../service/list.service'; // Check this path
import { ListInput } from "../types";
import listService from "../service/list.service";
import { FavoritesList } from "../model/favoritesList";



const router = express.Router();





router.put('/remove', async (req: Request, res: Response) => {
    const { username, gameId } = req.query;
    try {
        if (!username || !gameId) {
            return res.status(400).json({ message: "Missing username or gameId" });
        }
        
        const usernameString = String(username);
        const gameIdNumber = Number(gameId);
        const updatedList = await listService.replace(usernameString, gameIdNumber);
        const sanitizeUpdatedList = {
            ...updatedList,
            owner: {
                ...updatedList.owner,
                // Convert BigInt phoneNumber to string, with null fallback
                phoneNumber: updatedList.owner.phoneNumber 
                    ? BigInt(updatedList.owner.phoneNumber).toString() 
                    : null,
            }
        };
        return res.json(
           updatedList
        );
    } catch(error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Error removing game from favorites",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    } 
})

router.put('/add', async (req: Request, res: Response) => {
    const { username, gameId } = req.query;

    try {
        // Ensure that both username and gameId are provided
        if (!username || !gameId) {
            return res.status(400).json({ message: "Missing username or gameId" });
        }

        // Call the service to add the game to favorites
        const { message, favoritesList } = await listService.addGameToFavorites(
            String(username), 
            Number(gameId)
        );

        // Serialize the favorites list, handling complex objects
        const serializedFavoritesList = {
            ...favoritesList,
            owner: {
                ...favoritesList.owner,
                phoneNumber: favoritesList.owner.phoneNumber 
                    ? favoritesList.owner.phoneNumber.toString() 
                    : null
            },
            games: favoritesList.games.map(game => ({
                ...game,
                // Add any additional game serialization if needed
            }))
        };

        // Return a success response with the updated list
        res.status(200).json({
            message,
            updatedFavoritesList: serializedFavoritesList
        });

    } catch (error) {
        console.error("Error adding game to favorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
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

        // 3. Fetch single favorites list from database for that user
        const favoritesList = await favoritesListService.fetchByUsername(username);
        
        // Properly handle case when no favorites list is found
        if (!favoritesList) { 
            return res.status(404).json({ 
                message: "No favorites list found for this user" 
            });
        } 

        // 4. Convert BigInt fields to string if necessary
        const serializedFavoritesList = {
            ...favoritesList,
            owner: {
                ...favoritesList.owner,
                phoneNumber: favoritesList.owner.phoneNumber 
                    ? favoritesList.owner.phoneNumber.toString() 
                    : null
            }
        };

        // 5. Return the serialized favorites list
        res.status(200).json(serializedFavoritesList);

    } catch (error) {
        console.error("Error fetching favorites list:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
});

export default router;