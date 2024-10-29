import { PurchasedGames } from "../model/purchasedGames";
import GameDb from "../repository/game.db";


const games = GameDb.getAllGames();

const purchasedGames = [
    new PurchasedGames(games.slice(2, 4)),  
    new PurchasedGames(games.slice(1, 3)),  
    new PurchasedGames(games.slice(1, 2)),   
    new PurchasedGames(games.slice(3, 5)),  
    new PurchasedGames(games.slice(4, 5))   
];

export default {
    purchasedGames
}