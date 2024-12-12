import { DomainError } from "../errors/DomainError";
import { FavoritesList } from "./favoritesList";
import { Game } from "./game";
import { UserRole } from "./role.enum";

export class User {
    id: number;
    username: string;
    phoneNumber: number;
    emailAddress: string;
    birthDate: Date;
    password: string;
    accountCreationDate: Date;
    timeZone: string;
    country: string;   
    age?: number;
    purchasedGames: Game[];
    favoritesList?: FavoritesList;
    role: UserRole; 
    // enum of standard / moderator 
    constructor(data: {
        id: number;
        username: string;
        phoneNumber: number;
        emailAddress: string;
        birthDate: Date;
        password: string;
        accountCreationDate: Date;
        timeZone: string;
        country: string;
        age?: number;
        role: UserRole;
    }) {
        if (!data.username) {
            throw new DomainError("Username is required");
        }
        if (!this.validatePhoneNumber(data.phoneNumber)) {
            throw new DomainError("Invalid phone number format.");
        }
        if (!this.validateEmailAddress(data.emailAddress)) {
            throw new DomainError("Invalid email address format.");
        }
        // if (!this.validateBirthDate(data.birthDate)) {
        //     throw new DomainError("Birth date cannot be in the future.");
        // }
        if (!this.validatePassword(data.password)) {
            throw new DomainError("Password must be at least 8 characters, include at least one letter and one number.");
        }
        // if (!this.validateAccountCreationDate(data.accountCreationDate)) {
        //     throw new DomainError("Account creation date cannot be in the future.");
        // }
        if (!this.validateTimeZone(data.timeZone)) {
            throw new DomainError("Invalid time zone format.");
        }
        if (!this.validateCountry(data.country)) {
            throw new DomainError("Country name must contain only letters and spaces.");
        }
        if (data.age !== undefined && !this.validateAge(data.age)) {
            throw new DomainError("Age cannot be below 0.");
        }

        // Assign validated values
        this.id = data.id;
        this.username = data.username;
        this.phoneNumber = data.phoneNumber;
        this.emailAddress = data.emailAddress;
        this.birthDate = data.birthDate;
        this.password = data.password;
        this.accountCreationDate = data.accountCreationDate;
        this.timeZone = data.timeZone;
        this.country = data.country;
        this.age = data.age;
        this.purchasedGames = [];
        this.role = data.role;
    }

    // Validation methods
    private validatePhoneNumber(phoneNumber: number): boolean {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber.toString());
    }

    private validateEmailAddress(emailAddress: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress);
    }

    private validateBirthDate(birthDate: Date): boolean {
        return birthDate < new Date();
    }

    private validatePassword(password: string): boolean {
        return password.length >= 8;
    }

    private validateAccountCreationDate(accountCreationDate: Date): boolean {
        return accountCreationDate <= new Date();
    }

    private validateTimeZone(timeZone: string): boolean {
        const timeZoneRegex = /^[A-Za-z\/\+\-0-9]+$/;
        return timeZoneRegex.test(timeZone);
    }

    private validateCountry(country: string): boolean {
        const countryRegex = /^[A-Za-z\s]+$/;
        return countryRegex.test(country);
    }

    private validateAge(age: number): boolean {
        return age >= 0;
    }
    
    static from(data: {
        id: number;
        username: string;
        phoneNumber: number;
        emailAddress: string;
        birthDate: Date;
        password: string;
        accountCreationDate: Date;
        timeZone: string;
        country: string;
        age?: number;
        role: UserRole;
    }): User {
        return new User(data);
    }
    
      // Public getters and setters
    public getId(): number {
        return this.id;
    }

    public setId(value: number): void {
        this.id = value;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(value: string): void {
        if (!value) throw new DomainError("Username cannot be empty.");
        this.username = value;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public setPhoneNumber(value: number): void {
        if (!this.validatePhoneNumber(value)) throw new DomainError("Invalid phone number format.");
        this.phoneNumber = value;
    }

    public getEmailAddress(): string {
        return this.emailAddress;
    }

    public setEmailAddress(value: string): void {
        if (!this.validateEmailAddress(value)) throw new DomainError("Invalid email address format.");
        this.emailAddress = value;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public setBirthDate(value: Date): void {
        if (!this.validateBirthDate(value)) throw new DomainError("Birth date cannot be in the future.");
        this.birthDate = value;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(value: string): void {
        if (!this.validatePassword(value)) throw new DomainError("Password must meet complexity requirements.");
        this.password = value;
    }

    public getAccountCreationDate(): Date {
        return this.accountCreationDate;
    }

    public setAccountCreationDate(value: Date): void {
        if (!this.validateAccountCreationDate(value)) throw new DomainError("Account creation date cannot be in the future.");
        this.accountCreationDate = value;
    }

    public getTimeZone(): string {
        return this.timeZone;
    }

    public setTimeZone(value: string): void {
        if (!this.validateTimeZone(value)) throw new DomainError("Invalid time zone format.");
        this.timeZone = value;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(value: string): void {
        if (!this.validateCountry(value)) throw new DomainError("Country name must contain only letters and spaces.");
        this.country = value;
    }

    public getAge(): number | undefined {
        return this.age;
    }

    public setAge(value: number | undefined): void {
        if (value !== undefined && !this.validateAge(value)) throw new DomainError("Age cannot be below 0.");
        this.age = value;
    }

    public getPurchasedGames(): Game[] {
        return this.purchasedGames;
    }

    public setPurchasedGames(value: Game[]): void {
        this.purchasedGames = value;
    }

    public getFavoritesList(): FavoritesList | undefined {
        return this.favoritesList;
    }

    public setFavoritesList(value: FavoritesList | undefined): void {
        this.favoritesList = value;
    }



}
