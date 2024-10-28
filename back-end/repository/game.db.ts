import { Game } from "../model/game";

const games = [
    new Game({
        genre: "Action",
        rating: 4.5,
        supportedLanguages: "English, Spanish, French",
        title: "Cyber Battle",
        price: 59.99,
        systemRequirements: "8GB RAM, GTX 1050, 50GB Storage",
        releaseDate: new Date("2023-04-20"),
        multiplayer: true
    }),
    new Game({
        genre: "Adventure",
        rating: 4.8,
        supportedLanguages: "English, Japanese",
        title: "Mystic Quest",
        price: 49.99,
        systemRequirements: "4GB RAM, Intel HD Graphics, 20GB Storage",
        releaseDate: new Date("2022-11-15"),
        multiplayer: false
    }),
    new Game({
        genre: "RPG",
        rating: 4.9,
        supportedLanguages: "English, German, Russian",
        title: "Legend of Aria",
        price: 39.99,
        systemRequirements: "12GB RAM, RTX 2060, 70GB Storage",
        releaseDate: new Date("2021-07-30"),
        multiplayer: true
    }),
    new Game({
        genre: "Simulation",
        rating: 4.3,
        supportedLanguages: "English, Chinese, Korean",
        title: "City Architect",
        price: 29.99,
        systemRequirements: "8GB RAM, GTX 960, 10GB Storage",
        releaseDate: new Date("2020-01-20"),
        multiplayer: false
    }),
    new Game({
        genre: "Strategy",
        rating: 4.6,
        supportedLanguages: "English, Italian, Portuguese",
        title: "Empire Rulers",
        price: 34.99,
        systemRequirements: "6GB RAM, GTX 750, 15GB Storage",
        releaseDate: new Date("2023-05-15"),
        multiplayer: true
    })
];
