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
        this.validate(User);
        this.phoneNumber = User.phoneNumber;
        this.emailAddress = User.emailAddress;
        this.birthDate = User.birthDate;
        this.password = User.password;
        this.accountCreationDate = User.accountCreationDate;
        this.timeZone = User.timeZone;
        this.country = User.country;
        this.age = this.calculateAge(this.birthDate);
    }
    validate(User: { 
        phoneNumber: number;
        emailAddress: string;
        birthDate: Date;
        password: string;
        accountCreationDate: Date;
        timeZone: string;
        country: string;
        age: number;
    }) {
        if (!User.phoneNumber) { 
            throw new Error ("phone number was not specified")
        }
        if (!User.emailAddress)  {
            throw new Error ("email address wa not specified")
        }

        if (!User.birthDate) {
            throw new Error("birth date was not specified");
        }
        if (!User.password) {
            throw new Error("password was not specified");
        }
        if (!User.accountCreationDate) {
            throw new Error("account creation date was not specified");
        }
        if (!User.timeZone) {
            throw new Error("time zone was not specified");
        }
        if (!User.country) {
            throw new Error("country was not specified");
        }
        if (User.age === undefined || User.age === null) {
            throw new Error("age was not specified");
        }
        if (User.age < 6 ) {
            throw new Error('underaged users can not register, grow up at first lil bro')
        }
        if (User.password.length < 8)  {
            throw new Error('password must be at least 8 charcaters long')
        }
    }

    public calculateAge(birthDate: Date): number { 
        const today = new Date();
        let age  = today.getFullYear() - birthDate.getFullYear();
        return age;

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
