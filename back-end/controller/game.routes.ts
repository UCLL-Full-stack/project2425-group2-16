import express, { Request, Response } from 'express';
import gameService from '../service/game.service';

const router = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /games/delete:
 *   delete:
 *     security:
 *        - BearerAuth: []
 *     summary: Delete a game by ID
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the game to delete
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authorization
 *     responses:
 *       200:
 *         description: Game successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Game deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                   example: "error"
 *                 errorMessage:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while deleting the game."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                   example: "error"
 *                 errorMessage:
 *                   type: string
 *                   description: Error message
 *                   example: "An unknown error occurred."
 */

/**
 * @swagger
 * /games/purchasedByUser:
 *   get:
 *     security:
 *        - BearerAuth: []
 *     summary: Retrieve a list of games purchased by a user
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authorization
 *     responses:
 *       200:
 *         description: A list of games purchased by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genre:
 *                     type: string
 *                     description: The genre of the game
 *                     example: "Fighting"
 *                   rating:
 *                     type: number
 *                     format: float
 *                     description: The rating of the game
 *                     example: 4.6
 *                   supportedLanguages:
 *                     type: string
 *                     description: The languages supported by the game
 *                     example: "English, Korean, Chinese"
 *                   title:
 *                     type: string
 *                     description: The title of the game
 *                     example: "Battle Arena"
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the game
 *                     example: 59.99
 *                   systemRequirements:
 *                     type: string
 *                     description: The system requirements to play the game
 *                     example: "8GB RAM, GTX 1070, 40GB Storage"
 *                   releaseDate:
 *                     type: string
 *                     format: date
 *                     description: The release date of the game
 *                     example: "2023-02-14"
 *                   multiplayer:
 *                     type: boolean
 *                     description: Indicates if the game supports multiplayer
 *                     example: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                   example: "error"
 *                 errorMessage:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while retrieving purchased games."
 */

/**
 * @swagger
 * /games/gameByTitle:
 *   get:
 *     security:
 *        - BearerAuth: []
 *     summary: Retrieve a game by its title
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the game
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authorization
 *     responses:
 *       200:
 *         description: The game with the specified title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genre:
 *                   type: string
 *                   description: The genre of the game
 *                   example: "Fighting"
 *                 rating:
 *                   type: number
 *                   format: float
 *                   description: The rating of the game
 *                   example: 4.6
 *                 supportedLanguages:
 *                   type: string
 *                   description: The languages supported by the game
 *                   example: "English, Korean, Chinese"
 *                 title:
 *                   type: string
 *                   description: The title of the game
 *                   example: "Battle Arena"
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the game
 *                   example: 59.99
 *                 systemRequirements:
 *                   type: string
 *                   description: The system requirements to play the game
 *                   example: "8GB RAM, GTX 1070, 40GB Storage"
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   description: The release date of the game
 *                   example: "2023-02-14"
 *                 multiplayer:
 *                   type: boolean
 *                   description: Indicates if the game supports multiplayer
 *                   example: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Title parameter is required"
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Game not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "server error"
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An unknown error occurred."
 */

router.delete('/delete', async (req: Request, res: Response) => {
    try {
        const i = req.query.id;
        const id = Number(i);
        const deleteMaBoy = await gameService.deleteGame(id);
        res.status(200).json(deleteMaBoy);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                status: 'error',
                errorMessage: error.message,
            });
            console.error(`Error: ${error.message}`);
        } else {
            res.status(500).json({
                status: 'error',
                errorMessage: 'An unknown error occurred',
            });
            console.error('Unknown error:', error);
        }
    }
});

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

router.get('/purchasedByUser', async (req: Request, res: Response) => {
    try {
        const username = req.query.username;
        const gamesToReturn = await gameService.fetchPurchasedForUser(String(username));
        res.status(200).json(gamesToReturn);
    } catch (error) {
        res.status(400).json({ status: 'error' });
    }
});

router.get('/gameByTitle', async (req: Request, res: Response) => {
    try {
        const title = req.query.title as string;

        // Ensure title is present in the query params
        if (!title) {
            return res.status(400).json({ error: 'Title parameter is required' });
        }

        // Fetch the game by title using the service
        const game = await gameService.findGameByTitle(title);

        // Handle case where the game is not found
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Return the found game
        res.status(200).json(game);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching game:', error);
        const err = error as Error;
        res.status(500).json({ error: 'server error', message: err.message });

        // Return a generic error message with status 500 for internal server errors
        // res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

export default router;
