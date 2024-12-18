import express, { Request, Response } from 'express';
// import userService from "../service/user.service";
import userService from '../service/user.service'; // Check this path
import { User } from '../model/user';
import { DomainError } from '../errors/DomainError';
import { Login, UserInput } from '../types'; // Correct the import path
import { ServiceError } from '../errors/ServiceError';
import loginValidationMiddleware from '../middleware/loginValidationMiddleware';
import gameDb from '../repository/game.db';
import userDb from '../repository/user.db';

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
 * /users/getAll:
 *   get:
 *     security:
 *        - BearerAuth: []
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: All users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/post:
 *   post:
 *     summary: Registering a new user in the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User saved in the system
 *         content:>
 *         description: User logged in successfully, token returned.
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
 */

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        const role = req.query.role as string;
        const users = await userService.getAllUsers(role);
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ status: 'error', errorMessage: err.message });
    }
});

router.get('/getByUsername', async (req: Request, res: Response) => {
    try {
        const username = req.query.username as string;
        const result = await userService.findByUsername(username);

        // Convert BigInt fields to strings in the result
        const sanitizedResult = {
            ...result,
            phoneNumber: result.phoneNumber ? result.phoneNumber.toString() : null, // Example for id
        };

        res.status(201).json(sanitizedResult);
    } catch (error) {
        if (error instanceof DomainError) {
            return res.status(400).json({ error: error.message }); // Bad request
        }
        if (error instanceof ServiceError) {
            return res.status(409).json({ error: error.message }); // Conflict
        }
        console.error(error); // Log unexpected errors
        res.status(500).json({ error: 'Internal server error' }); // Generic error
    }
});




router.post('/post', async (req: Request, res: Response) => {
    try {
        const user = new User(req.body); // This might throw a DomainError
        const result = await userService.saveNewUser(user);
        res.status(201).json(result); // Use 201 for resource creation
    } catch (error) {
        if (error instanceof DomainError) {
            return res.status(400).json({ error: error.message }); // Bad request
        }
        if (error instanceof ServiceError) {
            return res.status(409).json({ error: error.message }); // Conflict
        }
        console.error(error); // Log unexpected errors
        res.status(500).json({ error: 'Internal server error' }); // Generic error
        // thrown while creating user :/
    }
});

router.post('/postlogin', loginValidationMiddleware, async (req: Request, res: Response) => {
    try {
        const credentials: UserInput = req.body;
        
        // Handle potential null case when user is not found
        const user = await userDb.findByEmail(credentials.emailAddress);
        
        // Add null check before accessing methods
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fix the object destructuring and pass correct parameters
        const result = await userService.authenticate({
            emailAddress: credentials.emailAddress, 
            password: credentials.password, 
            role: user.getRole() // Correctly access role
        });

        res.status(201).json(result);
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({ error: err.message });
    }
});
router.put('/addPurchase', async (req: Request, res: Response) => { 
    try {
        const username = req.query.username; // Extract username from query parameters
        const gameIdStr = req.query.gameId;
        const gameId = Number(gameIdStr);
        if (!username || !gameId) {
            return res.status(400).json({ error: "Username and gameId are required" });
        }

        const plainUser  = await userDb.findByUsername(String(username));
        if (!plainUser ) { 
            return res.status(404).json({ error: "User  not found" });
        }
        if (gameId == null || !gameId) { 
            return res.status(404).json({ error: "there is no id dawg"}) 
        }

        const user = User.from(plainUser );
        await userService.updatePurchasedGames(user, gameId)
        // user.addPurchasedGame(game);

        // await userDb.updatePurchases(user); // Removed the extra parenthesis

        res.status(200).json({ message: "Purchase successful" });
    } catch (error) {
        console.error("Error processing purchase:", error);
        res.status(500).json({ error: "Internal server error" });
    }

    router.post('/addPayment', async (req: Request, res: Response) => { 
        try { 
            // Extract and validate required fields from the request body
            const username = req.query.username;
            const {amount, currency, gameId, time } = req.body;
    
            // Comprehensive validation
            if (!username) {
                
                return res.status(400).json({ error: "Username is required" });
            }
    
            if (!amount || typeof amount !== 'number' || amount <= 0) {
                
                return res.status(400).json({ error: "Invalid amount" });
            }
    
            if (!currency || typeof currency !== 'string') {
                
                return res.status(400).json({ error: "Invalid currency" });
            }
    
            if (!time || isNaN(new Date(time).getTime())) {

                return res.status(400).json({ error: "Invalid timestamp" });
            }
    
            if (!gameId) {
                return res.status(400).json({ error: "Game ID is required" });
            }
    
            // Call service layer to process the payment
            const usernameConverted = String(username);
            if (!usernameConverted || usernameConverted == null) {
                console.log("problem found");
            };
            await userService.addPayment(usernameConverted, amount, currency, gameId, time);
    
            // Send success response
            return res.status(201).json({ message: "Payment added successfully" });
    
        } catch (error) {
            console.error("Error adding payment:", error);
            const err = error as Error;
            return res.status(500).json({ error: `Something went wrong in the backend: ${err.message}` });
        }
    });
    
});

export default router;
