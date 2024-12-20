import { Purchase } from '../../model/purchase'; // Adjust the import path as necessary
import { DomainError } from '../../errors/DomainError'; // Adjust the import path as necessary
import { User } from '../../model/user';
import { Game } from '../../model/game';

describe('Purchase Class', () => {
    
    test('Given valid inputs, when creating a Purchase, then it should create the Purchase successfully', () => {
        const validPurchase = {
            dateOfPurchase: new Date('2023-01-01'),
            currency: 'USD',
            amountPayed: 100,
            user: new User({
                id: 1,
                username: 'testuser',
                phoneNumber: BigInt(1234567890),
                emailAddress: 'test@example.com',
                birthDate: new Date('2000-01-01'),
                password: 'securePassword123',
                accountCreationDate: new Date(),
                timeZone: 'GMT+1',
                country: 'CountryName',
                role: 'standard', // Adjust the role as necessary
            }),
            game: new Game({
                id: 1,
                genre: 'Action',
                rating: 4.5,
                supportedLanguages: 'English',
                title: 'Test Game',
                price: 59.99,
                systemRequirements: 'Windows 10',
                releaseDate: new Date('2022-01-01'),
                multiplayer: true,
                publisherId: 1,
            }),
        };
        const purchase = new Purchase(validPurchase);
        expect(purchase.getDateOfPurchase()).toEqual(validPurchase.dateOfPurchase);
        expect(purchase.getCurrency()).toBe(validPurchase.currency);
        expect(purchase.getAmountPayed()).toBe(validPurchase.amountPayed);
    });

    test('Given an invalid date, when creating a Purchase, then it should throw DomainError', () => {
        expect(() => {
            new Purchase({
                dateOfPurchase: new Date('invalid-date'), // Invalid date
                currency: 'USD',
                amountPayed: 100,
                user: new User({
                    id: 1,
                    username: 'testuser',
                    phoneNumber: BigInt(1234567890),
                    emailAddress: 'test@example.com',
                    birthDate: new Date('2000-01-01'),
                    password: 'securePassword123',
                    accountCreationDate: new Date(),
                    timeZone: 'GMT+1',
                    country: 'CountryName',
                    role: 'standard', // Adjust the role as necessary
                }),
                game: new Game({
                    id: 1,
                    genre: 'Action',
                    rating: 4.5,
                    supportedLanguages: 'English',
                    title: 'Test Game',
                    price: 59.99,
                    systemRequirements: 'Windows 10',
                    releaseDate: new Date('2022-01-01'),
                    multiplayer: true,
                    publisherId: 1,
                }),
            });
        }).toThrow(DomainError);
    });

    test('Given an invalid currency, when creating a Purchase, then it should throw DomainError', () => {
        expect(() => {
            new Purchase({
                dateOfPurchase: new Date(),
                currency: 'INVALID_CURRENCY', // Invalid currency
                amountPayed: 100,
                user: new User({
                    id: 1,
                    username: 'testuser',
                    phoneNumber: BigInt(1234567890),
                    emailAddress: 'test@example.com',
                    birthDate: new Date('2000-01-01'),
                    password: 'securePassword123',
                    accountCreationDate: new Date(),
                    timeZone: 'GMT+1',
                    country: 'CountryName',
                    role: 'standard', // Adjust the role as necessary
                }),
                game: new Game({
                    id: 1,
                    genre: 'Action',
                    rating: 4.5,
                    supportedLanguages: 'English',
                    title: 'Test Game',
                    price: 59.99,
                    systemRequirements: 'Windows 10',
                    releaseDate: new Date('2022-01-01'),
                    multiplayer: true,
                    publisherId: 1,
                }),
            });
        }).toThrow(DomainError);
    });

    test('Given an invalid amountPayed, when creating a Purchase, then it should throw DomainError', () => {
        expect(() => {
            new Purchase({
                dateOfPurchase: new Date(),
                currency: 'USD',
                amountPayed: -50, // Invalid amount
                user: new User({
                    id: 1,
                    username: 'testuser',
                    phoneNumber: BigInt(1234567890),
                    emailAddress: 'test@example.com',
                    birthDate: new Date('2000-01-01'),
                    password: 'securePassword123',
                    accountCreationDate: new Date(),
                    timeZone: 'GMT+1',
                    country: 'CountryName',
                    role: 'standard', // Adjust the role as necessary
                }),
                game: new Game({
                    id: 1,
                    genre: 'Action',
                    rating: 4.5,
                    supportedLanguages: 'English',
                    title: 'Test Game',
                    price: 59.99,
                    systemRequirements: 'Windows 10',
                    releaseDate: new Date('2022-01-01'),
                    multiplayer: true,
                    publisherId: 1,
                }),
            });
        }).toThrow(DomainError);
    });

});