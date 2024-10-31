import express, { Request, Response} from "express";
// import userService from "../service/user.service";
import userService from "../service/user.service"; // Check this path
import { User } from "../model/user";
import { DomainError } from "../errors/DomainError";
import { ServiceError } from "../errors/ServiceError";


const router = express.Router();

/** 
 * @swagger
 * /users/getAll:
 *   get: 
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: All users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */


/** 
 * @swagger
 * /users/post:
 *   post: 
 *     summary: Registering a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'  
 *     responses:
 *       200:
 *         description: User saved in the system
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */





router.get('/getAll', async (req: Request, res: Response) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch(error){
        const err = error as Error;
        res.status(400).json({status: 'error', errorMessage: err.message});
    }
} )


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
    }
});


export default router;