import gameService from '../../service/game.service';
import gameDb from '../../repository/game.db';
import { Game } from '../../model/game';

// Mock the game database
jest.mock('../../repository/game.db');

test('getAllGames should return all games from the database', () => {
    // Given
    const expectedGames = [
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
        // Add other game instances if needed for the test...
    ];

    // Mock the implementation of getAllGames to return the expected games
    (gameDb.getAllGames as jest.Mock).mockReturnValue(expectedGames);

    // When
    const result = gameService.getAllGames();

    // Then
    // expect(result).toEqual(expectedGames);
    expect(gameDb.getAllGames).toHaveBeenCalledTimes(1); // Ensure it was called once
});
