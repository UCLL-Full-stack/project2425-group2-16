import { DomainError } from "../errors/DomainError";

export class Game  { 
    private genre: string;
    private rating: number;
    private supportedLanguages: string;
    private title: string;
    private price: number;
    private systemRequirements: string;
    private releaseDate: Date;
    private multiplayer: boolean;


    constructor(Game: { 
        genre: string;
        rating: number;
        supportedLanguages: string;
        title: string;
        price: number;
        systemRequirements: string;
        releaseDate: Date;
        multiplayer: boolean;
    
    }) {
        this.validate(Game)
        this.genre = Game.genre;
        this.rating = Game.rating;
        this.supportedLanguages = Game.supportedLanguages;
        this.title = Game.title;
        this.price = Game.price;
        this.systemRequirements = Game.systemRequirements;
        this.releaseDate = Game.releaseDate;
        this.multiplayer = Game.multiplayer
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
    }) { 
        if (Game.rating > 5 || Game.rating < 0) { 
            throw new DomainError('Rating of a game can not be over 5 or below 0')
        }
        if (Game.title.length > 40) { 
            throw new DomainError('is it a game or a poem')
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
            throw new DomainError('Game price can not be negative')
        }
        if (!Game.multiplayer) { 
            throw new DomainError('no multiplayer status specification provided')
        }
        if (typeof Game.supportedLanguages !== 'string' || Game.supportedLanguages.trim() === '') {
            throw new DomainError('Supported languages must be a non-empty string.');
        }
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

    public setTitle(title: string): void {
        this.title = title;
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
}




  