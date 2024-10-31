import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './controller/user.routes';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

// app.use(cors());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

app.use('/users', userRoutes)

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
    else{
        res.status(400).json({status: 'application error', message: err.message});
    }
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                user: {
                    type: 'object',
                    properties: {
                        phoneNumber: {
                            type: 'integer',
                            description: 'User phone number',
                        },
                        emailAddress: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        birthDate: {
                            type: 'string',
                            format: 'date',
                            description: 'User birth date',
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                        },
                        accountCreationDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User account creation date',
                        },
                        timeZone: {
                            type: 'string',
                            description: 'User time zone',
                        },
                        country: {
                            type: 'string',
                            description: 'User country',
                        },
                        age: {
                            type: 'integer',
                            description: 'User age',
                        },
                        purchasedGames: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/PurchasedGames' 
                            },
                            description: 'List of purchased games',
                        },
                    },
                },
                PurchasedGames: {
                    type: 'object',
                    properties: {
        
                        gameId: {
                            type: 'integer',
                            description: 'ID of the purchased game',
                        },
                        purchaseDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Purchase date of the game',
                        },
                     
                    },
                },
            },
        },
    },
    apis: ['./controller/*.routes.ts'], 
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
