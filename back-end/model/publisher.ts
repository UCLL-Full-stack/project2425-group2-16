import { DomainError } from "../errors/DomainError";

export class Publisher { 
   
    private contactInformation: string;
    private overallRating: number;
    private dateOfFirstPublishing: Date;
    private name: string;
    private country: string;
    private website: string;

    constructor (Publisher: {
        contactInformation: string;
        overallRating: number;
        dateOfFirstPublishing: Date;
        name: string;
        country: string;
        website: string;
      
    }) {
        this.validate(Publisher);
        this.contactInformation = Publisher.contactInformation;
        this.overallRating = Publisher.overallRating;
        this.dateOfFirstPublishing = Publisher.dateOfFirstPublishing;
        this.name = Publisher.name;
        this.country = Publisher.country;
        this.website = Publisher.website;
    }

    validate(Publisher: {  contactInformation: string;
        overallRating: number;
        dateOfFirstPublishing: Date;
        name: string;
        country: string;
        website: string;

    }) { 
        if (Publisher.overallRating > 5 || Publisher.overallRating < 0) {
            throw new DomainError('rating can not be over 5 or below 0')
        }
        if (Publisher.dateOfFirstPublishing > new Date()) {
            throw new DomainError('date of first publishing can not be in future')
        }
        if (!Publisher.name || Publisher.name == "" ){
            throw new DomainError ('name can not be empty')
        }  
        if (Publisher.country.length > 50) {
            throw new DomainError('is it a country or a poem');
        }
        if (Publisher.website.length > 100) {
            throw new DomainError('is it an url or a poem');
        }
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

}