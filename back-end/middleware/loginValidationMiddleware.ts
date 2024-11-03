// validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { Login } from '../types';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { emailAddress, password } = req.body as Login;

    if (!emailAddress || emailAddress.trim() === '') {
        return res.status(400).json({ message: 'Email address is required.' });
    }
    if (!password || password.trim() === '') {
        return res.status(400).json({ message: 'Password is required.' });
    }

    next(); // Proceed to the next middleware or route handler if validation passes
};

export default validateLogin;
