import { Purchase } from '../../model/purchase'; // Adjust the import path as necessary
import { DomainError } from '../../errors/DomainError'; // Adjust the import path as necessary

describe('Purchase Class', () => {
    
    test('Given valid inputs, when creating a Purchase, then it should create the Purchase successfully', () => {
        const validPurchase = {
            dateOfPurchase: new Date('2023-01-01'),
            currency: 'USD',
            amountPayed: 100,
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
            });
        }).toThrow(DomainError);
    });

    test('Given an invalid currency, when creating a Purchase, then it should throw DomainError', () => {
        expect(() => {
            new Purchase({
                dateOfPurchase: new Date(),
                currency: 'INVALID_CURRENCY', // Invalid currency
                amountPayed: 100,
            });
        }).toThrow(DomainError);
    });

    test('Given an invalid amountPayed, when creating a Purchase, then it should throw DomainError', () => {
        expect(() => {
            new Purchase({
                dateOfPurchase: new Date(),
                currency: 'USD',
                amountPayed: -50, // Invalid amount
            });
        }).toThrow(DomainError);
    });

});