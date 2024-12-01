// validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Login, UserInput } from '../types';
import { UserInfo } from 'os';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as UserInput;

    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username is required.' });
    }
    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required.' });
    }

    next(); // Proceed to the next middleware or route handler if validation passes
};

export default validateLogin;
