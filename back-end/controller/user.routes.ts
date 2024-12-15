import express, { Request, Response } from 'express';
// import userService from "../service/user.service";
import userService from '../service/user.service'; // Check this path
import { User } from '../model/user';
import { DomainError } from '../errors/DomainError';
import { Login, UserInput } from '../types'; // Correct the import path
import { ServiceError } from '../errors/ServiceError';
import loginValidationMiddleware from '../middleware/loginValidationMiddleware';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/postlogin:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       204:
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
        const users = await userService.getAllUsers();
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
        const result = await userService.authenticate(credentials);
        res.status(201).json(result);
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({ error: err.message });
    }
});

export default router;
