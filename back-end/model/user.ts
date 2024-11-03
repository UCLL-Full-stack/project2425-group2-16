import { DomainError } from "../errors/DomainError";
import { PurchasedGames } from "./purchasedGames";

export class User {
    private username: string;
    private phoneNumber: number;
    private emailAddress: string;
    private birthDate: Date;
    private password: string;
    private accountCreationDate: Date;
    private timeZone: string;
    private country: string;
    private age: number;
    private purchasedGames: PurchasedGames[];

    constructor(User: {
        username: string;
        phoneNumber: number;
        emailAddress: string;
        birthDate: Date;
        password: string;
        accountCreationDate: Date;
        timeZone: string;
        country: string;
        age: number;
    }) {
        if (!User.username){
            throw new DomainError("Username is required");
        }
        // Validate each field before assigning
        if (!this.validatePhoneNumber(User.phoneNumber)) {
            throw new DomainError("Invalid phone number format.");
        }
        if (!this.validateEmailAddress(User.emailAddress)) {
            throw new DomainError("Invalid email address format.");
        }
        if (!this.validateBirthDate(User.birthDate)) {
            throw new DomainError("Birth date cannot be in the future.");
        }
        if (!this.validatePassword(User.password)) {
            throw new DomainError("Password must be at least 8 characters, include at least one letter and one number.");
        }
        if (!this.validateAccountCreationDate(User.accountCreationDate)) {
            throw new DomainError("Account creation date cannot be in the future.");
        }
        if (!this.validateTimeZone(User.timeZone)) {
            throw new DomainError("Invalid time zone format.");
        }
        if (!this.validateCountry(User.country)) {
            throw new DomainError("Country name must contain only letters and spaces.");
        }
        if (!this.validateAge(User.age)) {
            throw new DomainError("Age must be a non-negative number.");
        }

        // Assign validated values
        this.username = User.username;
        this.phoneNumber = User.phoneNumber;
        this.emailAddress = User.emailAddress;
        this.birthDate = User.birthDate;
        this.password = User.password;
        this.accountCreationDate = User.accountCreationDate;
        this.timeZone = User.timeZone;
        this.country = User.country;
        this.age = User.age;
        this.purchasedGames = [];
    }

    // Getters and setters with validation
    public getPhoneNumber(): number {
        return this.phoneNumber;
    }
    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        if (!username) {
            throw new DomainError("Username is required");
        }
        this.username = username;
    }

    public setPhoneNumber(phoneNumber: number): void {
        this.phoneNumber = phoneNumber;
    }

    public getEmailAddress(): string {
        return this.emailAddress;
    }

    public setEmailAddress(emailAddress: string): void {
        this.emailAddress = emailAddress;
    }

    public getBirthDate(): Date {
        return this.birthDate;
    }

    public setBirthDate(birthDate: Date): void {
        this.birthDate = birthDate;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getAccountCreationDate(): Date {
        return this.accountCreationDate;
    }

    public setAccountCreationDate(accountCreationDate: Date): void {
        this.accountCreationDate = accountCreationDate;
    }

    public getTimeZone(): string {
        return this.timeZone;
    }

    public setTimeZone(timeZone: string): void {
        this.timeZone = timeZone;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(age: number): void {
        this.age = age;
    }
    
    public getPurchasedGames(): PurchasedGames[] {
        return this.purchasedGames;
    }

    // Validation Methods
    private validatePhoneNumber(phoneNumber: number): boolean {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber.toString());
    }

    private validateEmailAddress(emailAddress: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress);
    }

    private validateBirthDate(birthDate: Date): boolean {
        const today = new Date();
        const toCompare = new Date(birthDate);
        return toCompare < today;
    }

    private validatePassword(password: string): boolean {
        return password.length > 8;
    }

    private validateAccountCreationDate(accountCreationDate: Date): boolean {
        const today = new Date();
        const toCompare = new Date(accountCreationDate);
        return toCompare <= today;
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
}
