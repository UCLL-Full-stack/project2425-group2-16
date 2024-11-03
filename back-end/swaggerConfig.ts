// swaggerConfig.ts
import { OpenAPIV3 } from 'openapi-types';

const swaggerOpts: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for My API',
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        description: 'Username of the user',
                        example: 'johndoe',
                    },
                    phoneNumber: {
                        type: 'integer',
                        description: 'Phone number of the user',
                        example: 1234567890,
                    },
                    emailAddress: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user',
                        example: 'mister.doe@example.com',
                    },
                    birthDate: {
                        type: 'string',
                        format: 'date',
                        description: 'Birth date of the user',
                        example: '1990-01-01',
                    },
                    password: {
                        type: 'string',
                        description: 'Password for the user account',
                        example: 'securepassword123',
                    },
                    accountCreationDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Date when the user account was created',
                        example: new Date().toISOString(),
                    },
                    timeZone: {
                        type: 'string',
                        description: 'User’s time zone',
                        example: 'GMT+6',
                    },
                    country: {
                        type: 'string',
                        description: 'Country of the user',
                        example: 'USA',
                    },
                    age: {
                        type: 'integer',
                        description: 'Age of the user',
                        example: 34,
                    },
                    purchasedGames: {
                        type: 'array',
                        items: {
                        },
                    },
                },
                required: ['username', 'phoneNumber', 'emailAddress', 'birthDate', 'password', 'accountCreationDate', 'timeZone', 'country', 'age'],
            },
            Game: {
                type: 'object',
                properties: {
                    genre: {
                        type: 'string',
                        description: 'Genre of the game',
                        example: 'Action',
                    },
                    rating: {
                        type: 'number',
                        format: 'float',
                        description: 'Rating of the game (0 to 5)',
                        example: 4.5,
                    },
                    supportedLanguages: {
                        type: 'string',
                        description: 'Languages supported by the game',
                        example: 'English, Spanish',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the game',
                        example: 'Epic Adventure',
                    },
                    price: {
                        type: 'number',
                        format: 'float',
                        description: 'Price of the game',
                        example: 59.99,
                    },
                    systemRequirements: {
                        type: 'string',
                        description: 'System requirements to run the game',
                        example: 'Windows 10, 8 GB RAM',
                    },
                    releaseDate: {
                        type: 'string',
                        format: 'date',
                        description: 'Release date of the game',
                        example: '2023-01-01',
                    },
                    multiplayer: {
                        type: 'boolean',
                        description: 'Indicates if the game supports multiplayer',
                        example: true,
                    },
                },
                required: ['genre', 'rating', 'supportedLanguages', 'title', 'price', 'systemRequirements', 'releaseDate', 'multiplayer'],
            },
            Login: {
                type: 'object',
                properties: {
                    emailAddress: {
                        type: 'string',
                        description: "User's email address",
                        example: "asdf@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "User's password",
                        example: "securePassword123"
                    }
                }
            }
        },
    },
    paths: {
        // Paths can be defined here or left for route annotations
    },
};

export default swaggerOpts;