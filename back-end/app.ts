import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './controller/user.routes';
import gameRoutes from './controller/game.routes';
import swaggerOpts from './swaggerConfig';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;


app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/post', '/users/postlogin']
    })
)

// app.use(cors());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

app.use('/users', userRoutes)

app.use('/games', gameRoutes)





app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "Unauthorized error"){
        res.status(401).json({status: 'unauthorized', message: err.message});
    }
    else if (err.name === "DomainError"){
        res.status(400).json({status: 'domain error', message: err.message});
    }
    else if (err.name === "ServiceError"){
        res.status(400).json({status: 'service error', message: err.message});
    }
    else{
        res.status(400).json({status: 'application error', message: err.message});
    }
});

const swaggerSpec = swaggerJSDoc({
    definition: swaggerOpts,
    apis: ['./controller/*.routes.ts'], // Automatically look for Swagger annotations
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
