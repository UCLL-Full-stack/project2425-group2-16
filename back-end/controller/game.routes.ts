import express, { Request, Response } from 'express';
import gameService from '../service/game.service';

const router = express.Router();


/**
 * @swagger
 * /games/getAll:
 *   get:
 *     summary: Retrieve a list of all games
 *     tags: 
 *       - Games
 *     responses:
 *       200:
 *         description: A list of games
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
 *                   example: "An error occurred while retrieving games."
 */




router.get('/getAll', async (req: Request, res: Response) => {
    try{
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    }
    catch(error){
        const err = error as Error;
        res.status(400).json({status: 'error', errorMessage: err.message});
    }
} )

export default router;