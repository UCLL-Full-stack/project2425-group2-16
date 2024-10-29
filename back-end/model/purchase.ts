export class Purchase {
    private dateOfPurchase: Date;
    private currency: string;
    private amountPayed: number;

    constructor(Purchase: {
        dateOfPurchase: Date;
        currency: string;
        amountPayed: number;
    }) {
        if (!this.validateDateOfPurchase(Purchase.dateOfPurchase)){
            throw new Error("Invalid date: date is required.");
        }
        if (!this.validateCurrency(Purchase.currency)){
            throw new Error("Invalid currency: currency in the form of USD, EUR, GBP, JPY or AUD is required.");
        } 
        if (!this.validateAmountPayed(Purchase.amountPayed)){
            throw new Error("Invalid amount payed: sum payed must be a number above 0.");
        }
        this.dateOfPurchase = Purchase.dateOfPurchase;
        this.currency = Purchase.currency;
        this.amountPayed = Purchase.amountPayed;
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
}
    

