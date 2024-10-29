export class PurchasedGames { 
    private totalValue: number;
  
    constructor(purchasedGames: { 
        totalValue: number;
    }) {
        this.validate(purchasedGames)
        this.totalValue = purchasedGames.totalValue;
    }

    validate(purchasedGames: { 
        totalValue: number;
        
    }) {
        if (purchasedGames.totalValue > 10) {
            throw new Error ('aaaa')
         }
    }


}


  
        
