export class User {
 
    private phoneNumber: number;
    private emailAddress: string;
    private birthDate: Date;
    private password: string;
    private accountCreationDate: Date;
    private timeZone: string;
    private country: string;
    private age: number;

    constructor(User: {
        phoneNumber: number;
        emailAddress: string;
        birthDate: Date;
        password: string;
        accountCreationDate: Date;
        timeZone: string;
        country: string;
        age: number;
    }) {
        this.phoneNumber = User.phoneNumber;
        this.emailAddress = User.emailAddress;
        this.birthDate = User.birthDate;
        this.password = User.password;
        this.accountCreationDate = User.accountCreationDate;
        this.timeZone = User.timeZone;
        this.country = User.country;
        this.age = User.age;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
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
}
