import { DomainError } from "../errors/DomainError";
import { User } from "./user";
import { Game } from "./game";

export class Purchase {
    private dateOfPurchase: Date;
    private currency: string;
    private amountPayed: number;
    private user: User; // Adding reference to the User
    private game: Game; // Adding reference to the Game

    constructor(Purchase: {
        dateOfPurchase: Date;
        currency: string;
        amountPayed: number;
        user: User; // User who made the purchase
        game: Game; // Game that was purchased
    }) {
        // Validate the data
        if (!this.validateDateOfPurchase(Purchase.dateOfPurchase)){
            throw new DomainError("Invalid date: date is required.");
        }
        if (!this.validateCurrency(Purchase.currency)){
            throw new DomainError("Invalid currency: currency in the form of USD, EUR, GBP, JPY or AUD is required.");
        } 
        if (!this.validateAmountPayed(Purchase.amountPayed)){
            throw new DomainError("Invalid amount payed: sum payed must be a number above 0.");
        }
        if (!Purchase.user) {
            throw new DomainError("User is required.");
        }
        if (!Purchase.game) {
            throw new DomainError("Game is required.");
        }

        // Set properties
        this.dateOfPurchase = Purchase.dateOfPurchase;
        this.currency = Purchase.currency;
        this.amountPayed = Purchase.amountPayed;
        this.user = Purchase.user;
        this.game = Purchase.game;
    }

    private validateDateOfPurchase(dateOfPurchase: Date): boolean {
        return dateOfPurchase instanceof Date && !isNaN(dateOfPurchase.getTime());
    }

    private validateCurrency(currency: string): boolean {
        const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD']; // Add more as needed
        return validCurrencies.includes(currency);
    }

    private validateAmountPayed(amountPayed: number): boolean {
        return typeof amountPayed === 'number' && amountPayed > 0;
    }

    // Getters and Setters

    public getDateOfPurchase(): Date {
        return this.dateOfPurchase;
    }

    public setDateOfPurchase(dateOfPurchase: Date): void {
        this.dateOfPurchase = dateOfPurchase;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getAmountPayed(): number {
        return this.amountPayed;
    }

    public setAmountPayed(amountPayed: number): void {
        this.amountPayed = amountPayed;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getGame(): Game {
        return this.game;
    }

    public setGame(game: Game): void {
        this.game = game;
    }

    public static from(data: {
        dateOfPurchase: Date;
        currency: string;
        amountPayed: number;
        user: User;
        game: Game;
    }): Purchase {
        return new Purchase(data);
    }

    
}
