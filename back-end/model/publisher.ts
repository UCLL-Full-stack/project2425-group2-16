import { DomainError } from "../errors/DomainError";
import { Game } from "./game";

export class Publisher {
    private id: number;  // Unique identifier for Publisher (added for schema reflection)
    private contactInformation: string;
    private overallRating: number;
    private dateOfFirstPublishing: Date;
    private name: string;
    private country: string;
    private website: string;
    private games: Game[];  // This might be populated by the Game model

    constructor(Publisher: {
        id: number;
        contactInformation: string;
        overallRating: number;
        dateOfFirstPublishing: Date;
        name: string;
        country: string;
        website: string;
    }) {
        this.validate(Publisher);
        this.id = Publisher.id;
        this.contactInformation = Publisher.contactInformation;
        this.overallRating = Publisher.overallRating;
        this.dateOfFirstPublishing = Publisher.dateOfFirstPublishing;
        this.name = Publisher.name;
        this.country = Publisher.country;
        this.website = Publisher.website;
        this.games = [];  // Initially an empty array, could be populated later
    }

    validate(Publisher: {
        id: number;
        contactInformation: string;
        overallRating: number;
        dateOfFirstPublishing: Date;
        name: string;
        country: string;
        website: string;
    }) {
        if (Publisher.overallRating > 5 || Publisher.overallRating < 0) {
            throw new DomainError('Rating cannot be over 5 or below 0');
        }
        if (Publisher.dateOfFirstPublishing > new Date()) {
            throw new DomainError('Date of first publishing cannot be in the future');
        }
        if (!Publisher.name || Publisher.name === "") {
            throw new DomainError('Name cannot be empty');
        }
        if (Publisher.country.length > 50) {
            throw new DomainError('Country name is too long');
        }
        if (Publisher.website.length > 100) {
            throw new DomainError('Website URL is too long');
        }
    }

    // Getters and Setters for the Publisher fields

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getContactInformation(): string {
        return this.contactInformation;
    }

    public setContactInformation(contactInformation: string): void {
        this.contactInformation = contactInformation;
    }

    public getOverallRating(): number {
        return this.overallRating;
    }

    public setOverallRating(overallRating: number): void {
        this.overallRating = overallRating;
    }

    public getDateOfFirstPublishing(): Date {
        return this.dateOfFirstPublishing;
    }

    public setDateOfFirstPublishing(dateOfFirstPublishing: Date): void {
        this.dateOfFirstPublishing = dateOfFirstPublishing;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getWebsite(): string {
        return this.website;
    }

    public setWebsite(website: string): void {
        this.website = website;
    }

    // You may not need to manage the `games` list manually since it's a reflection of the many-to-one relationship in the Game model,
    // but if you do want to have access to games from Publisher, you can leave this as is.
    public getGames(): Game[] {
        return this.games;
    }

    public addGame(game: Game): void {
        this.games.push(game);
    }

    public removeGame(game: Game): void {
        this.games = this.games.filter(g => g !== game);
    }

    public static from(data: {
        id: number;
        contactInformation: string;
        overallRating: number;
        dateOfFirstPublishing: Date;
        name: string;
        country: string;
        website: string;
    }): Publisher {
        return new Publisher(data);
    }
}
