import { DomainError } from "../errors/DomainError";
import { Game } from "./game";

export class PurchasedGames { 
    private gamesList: Game[];
    private totalValue: number;
  
    constructor(gamesList: Game[]){
        if (!this.validateGamesList(gamesList)){
            throw new DomainError("Invalid game list: game list should either be empty or contain a list of games.");
        }
        this.gamesList = gamesList;
        this.totalValue = this.getTotalValue();
    }

    private validateGamesList(gamesList: any[]): boolean {
        if (!Array.isArray(gamesList)) {
            return false;
        }
        for (const game of gamesList) {
            if (!(game instanceof Game)) {
                return false;
            }
        }
        return true;
    }

    public getTotalValue(): number{
        if (this.gamesList.length == 0){
            return 0
        }
        else{
            let value = 0;
            for (const game of this.gamesList){
                value += game.getPrice();
            }
            return value;
        }
    }


    // very random validation we dont even need this 
    // you're right, it was so random I just deleted it lmao
}


  
        
