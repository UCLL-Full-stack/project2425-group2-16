import express, { Request, Response} from "express";
// import userService from "../service/user.service";
import userService from "../service/user.service"; // Check this path
import { User } from "../model/user";


const router = express.Router();


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
    const user = req.body as User;
    const result = await userService.saveNewUser(user);
    res.status(200).json(result);
})

export default router;