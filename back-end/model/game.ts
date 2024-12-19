import { DomainError } from "../errors/DomainError";
import { Publisher } from "./publisher";
import { Purchase } from "./purchase";

export class Game {
    id: number;
    genre: string;
    rating: number;
    supportedLanguages: string;
    title: string;
    price: number;
    systemRequirements: string;
    releaseDate: Date;
    multiplayer: boolean;
    publisherId: number;  // Foreign key to Publisher
    publisher?: Publisher; // Optional relation to Publisher (will be fetched later)
    purchases: Purchase[];

    constructor(Game: {
        id: number;
        genre: string;
        rating: number;
        supportedLanguages: string;
        title: string;
        price: number;
        systemRequirements: string;
        releaseDate: Date;
        multiplayer: boolean;
        publisherId: number; // Foreign key to Publisher
    }) {
        this.validate(Game);
        this.id = Game.id;
        this.genre = Game.genre;
        this.rating = Game.rating;
        this.supportedLanguages = Game.supportedLanguages;
        this.title = Game.title;
        this.price = Game.price;
        this.systemRequirements = Game.systemRequirements;
        this.releaseDate = Game.releaseDate;
        this.multiplayer = Game.multiplayer;
        this.publisherId = Game.publisherId; // Assign the publisherId
        this.publisher = undefined; // The publisher relation can be populated later
        this.purchases = [];
    }

    validate(Game: {
        genre: string;
        rating: number;
        supportedLanguages: string;
        title: string;
        price: number;
        systemRequirements: string;
        releaseDate: Date;
        multiplayer: boolean;
        publisherId: number; // Foreign key to Publisher
    }) {
        if (Game.rating > 5 || Game.rating < 0) {
            throw new DomainError('Rating of a game can not be over 5 or below 0');
        }
        if (Game.title.length > 40) {
            throw new DomainError('is it a game or a poem');
        }
        if (!Game.title) {
            throw new DomainError('Title is required.');
        }
        if (!Game.genre) {
            throw new DomainError('Genre is required.');
        }
        if (!Game.systemRequirements) {
            throw new DomainError('System requirements are required.');
        }
        if (Game.price < 0) {
            throw new DomainError('Game price can not be negative');
        }
        if (Game.multiplayer === undefined || Game.multiplayer === null) {
            throw new DomainError('No multiplayer status specification provided');
        }
        if (typeof Game.supportedLanguages !== 'string' || Game.supportedLanguages.trim() === '') {
            throw new DomainError('Supported languages must be a non-empty string.');
        }
        if (Game.publisherId === undefined || Game.publisherId === null) {
            throw new DomainError('Publisher ID is required.');
        }
    }


    public getId(): number {
        return this.id;
    } 

    public getGenre(): string {
        return this.genre;
    }

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getSupportedLanguages(): string {
        return this.supportedLanguages;
    }

    public setSupportedLanguages(supportedLanguages: string): void {
        this.supportedLanguages = supportedLanguages;
    }

    public getTitle(): string {
        return this.title;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getSystemRequirements(): string {
        return this.systemRequirements;
    }

    public setSystemRequirements(systemRequirements: string): void {
        this.systemRequirements = systemRequirements;
    }

    public getReleaseDate(): Date {
        return this.releaseDate;
    }

    public setReleaseDate(releaseDate: Date): void {
        this.releaseDate = releaseDate;
    }

    public isMultiplayer(): boolean {
        return this.multiplayer;
    }

    public setMultiplayer(multiplayer: boolean): void {
        this.multiplayer = multiplayer;
    }

    // Accessor and mutator for Publisher ID (the foreign key)
    public getPublisherId(): number {
        return this.publisherId;
    }

    public setPublisherId(publisherId: number): void {
        this.publisherId = publisherId;
    }

    // Accessor and mutator for Publisher object (optional relation)
    public getPublisher(): Publisher | undefined {
        return this.publisher;
    }

    public setPublisher(publisher: Publisher): void {
        this.publisher = publisher;
    }

    public getPurchases(): Purchase[] {
        return this.purchases;
    }

    public addPurchase(purchase: Purchase): void {
        this.purchases.push(purchase);
    }

    public removePurchase(purchase: Purchase): void {
        this.purchases = this.purchases.filter(g => g !== purchase);
    }

    public static from(data: {
        id: number;
        genre: string;
        rating: number;
        supportedLanguages: string;
        title: string;
        price: number;
        systemRequirements: string;
        releaseDate: Date;
        multiplayer: boolean;
        publisherId: number;
    }): Game {
        return new Game(data);
    }
}
