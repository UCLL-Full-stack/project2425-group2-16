export class Purchase {
    private dateOfPurchase: Date;
    private currency: string;
    private amountPayed: number;

    constructor(Purchase: {
        dateOfPurchase: Date;
        currency: string;
        amountPayed: number;
    }) { 
        this.dateOfPurchase = Purchase.dateOfPurchase;
        this.currency = Purchase.currency;
        this.amountPayed = Purchase.amountPayed;
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
    

