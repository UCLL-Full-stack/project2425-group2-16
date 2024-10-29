import { PurchasedGames } from '../../model/purchasedGames';
import { Game } from '../../model/game';
import { DomainError } from '../../errors/DomainError';



test("Given a valid list of games, when creating PurchasedGames, then it should be created successfully", () => {
    const game1 = new Game({
        genre: "Strategy",
        rating: 4.6,
        supportedLanguages: "English, Italian, Portuguese",
        title: "Empire Rulers",
        price: 34.99,
        systemRequirements: "6GB RAM, GTX 750, 15GB Storage",
        releaseDate: new Date("2023-05-15"),
        multiplayer: true
    });
    const game2 = new Game({
        genre: "Simulation",
        rating: 4.3,
        supportedLanguages: "English, Chinese, Korean",
        title: "City Architect",
        price: 29.99,
        systemRequirements: "8GB RAM, GTX 960, 10GB Storage",
        releaseDate: new Date("2020-01-20"),
        multiplayer: false
    });
    const gamesList = [game1, game2];

    const purchasedGames = new PurchasedGames(gamesList);

    expect(purchasedGames.getTotalValue()).toBe(64.98); // Total value = 20 + 30
});

test("Given an empty games list, when creating PurchasedGames, then it should create successfully with total value of 0", () => {
    const gamesList: Game[] = [];
    
    const purchasedGames = new PurchasedGames(gamesList);

    expect(purchasedGames.getTotalValue()).toBe(0); // No games, so total value should be 0
});


test("Given a non-array input, when creating PurchasedGames, then it should throw DomainError", () => {
    const invalidGamesList = "Not an array" as any; // Invalid type
    
    expect(() => {
        new PurchasedGames(invalidGamesList);
    }).toThrow(DomainError);
});


const validGamesList = [
    new Game({
        genre: "Action",
        rating: 4.5,
        supportedLanguages: "English, Spanish, French",
        title: "Cyber Battle",
        price: 59.99,
        systemRequirements: "8GB RAM, GTX 1050, 50GB Storage",
        releaseDate: new Date("2023-04-20"),
        multiplayer: true
    })
]


test("Given a list with a non-Game object, when creating PurchasedGames, then it should throw DomainError", () => {
    const invalidGamesList = [...validGamesList, { name: "Invalid Game", price: 15 }]; // Invalid object in list

    expect(() => {
        new PurchasedGames(invalidGamesList as any[]);
    }).toThrow(DomainError);
});

test("Given a list with null values, when creating PurchasedGames, then it should throw DomainError", () => {
    const invalidGamesList = [null, ...validGamesList]; // List contains a null value

    expect(() => {
        new PurchasedGames(invalidGamesList as any[]);
    }).toThrow(DomainError);
});

test("Given a list with undefined values, when creating PurchasedGames, then it should throw DomainError", () => {
    const invalidGamesList = [undefined, ...validGamesList]; // List contains an undefined value

    expect(() => {
        new PurchasedGames(invalidGamesList as any[]);
    }).toThrow(DomainError);
});

test("Given a list with a mix of Game instances and strings, when creating PurchasedGames, then it should throw DomainError", () => {
    const invalidGamesList = [...validGamesList, "Invalid Game"]; // List contains a string

    expect(() => {
        new PurchasedGames(invalidGamesList as any[]);
    }).toThrow(DomainError);
});