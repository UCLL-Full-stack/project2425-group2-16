import gameService from '../../service/game.service';
import gameDb from '../../repository/game.db';
import userDb from '../../repository/user.db';
import { Game } from '../../model/game';

jest.mock('../../repository/game.db');
jest.mock('../../repository/user.db');

const mockGame = {
    id: 1,
    title: 'Test Game',
    genre: 'Action',
    rating: 5,
    supportedLanguages: 'English',
    price: 29.99,
    systemRequirements: 'Minimum requirements',
    releaseDate: new Date(),
    multiplayer: false,
    publisherId: 1,
    purchases: []
};

beforeEach(() => {
    jest.clearAllMocks();
});

// Test for getAllGames
test('Given the database has games, When getAllGames is called, Then it should return all games', async () => {
    (gameDb.getAllGames as jest.Mock).mockResolvedValue([mockGame]);

    const games = await gameService.getAllGames();

    expect(games).toEqual([mockGame]);
    expect(gameDb.getAllGames).toHaveBeenCalledTimes(1);
});

// Test for findGameByTitle - game found
test('Given the database has the game, When findGameByTitle is called with an existing title, Then it should return the game', async () => {
    (gameDb.getAllGames as jest.Mock).mockResolvedValue([mockGame]);

    const game = await gameService.findGameByTitle('Test Game');

    expect(game).toEqual(mockGame);
});

// Test for findGameByTitle - game not found
test('Given the database does not have the game, When findGameByTitle is called with a non-existing title, Then it should return null', async () => {
    (gameDb.getAllGames as jest.Mock).mockResolvedValue([]);

    const game = await gameService.findGameByTitle('Nonexistent Game');

    expect(game).toBeNull();
});

// Test for deleteGame - game not purchased
test('Given the game is not purchased, When deleteGame is called, Then it should delete the game', async () => {
    (gameDb.findPurchasedGames as jest.Mock).mockResolvedValue([]);
    (gameDb.deleteGame as jest.Mock).mockResolvedValue(undefined);

    await expect(gameService.deleteGame(1)).resolves.toBeUndefined();
    expect(gameDb.findPurchasedGames).toHaveBeenCalledTimes(1);
    expect(gameDb.deleteGame).toHaveBeenCalledWith(1);
});

// Test for deleteGame - game purchased
test('Given the game is purchased, When deleteGame is called, Then it should throw an error', async () => {
    (gameDb.findPurchasedGames as jest.Mock).mockResolvedValue([1]);

    await expect(gameService.deleteGame(1)).rejects.toThrow("game can not be deleted, it is purchased by someone");
});

// Test for deleteGame - unexpected error
test('Given an unexpected error occurs, When deleteGame is called, Then it should throw an error', async () => {
    (gameDb.findPurchasedGames as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(gameService.deleteGame(1)).rejects.toThrow('Database error');
});

// Test for fetchPurchasedForUser - user found
test('Given the user exists, When fetchPurchasedForUser is called, Then it should return purchased games for the user', async () => {
    (userDb.findByUsername as jest.Mock).mockResolvedValue({ getId: () => 1 });
    (gameDb.findPurchased as jest.Mock).mockResolvedValue([mockGame]);

    const games = await gameService.fetchPurchasedForUser('testuser');

    expect(games).toEqual([mockGame]);
});

// Test for fetchPurchasedForUser - user not found
test('Given the user does not exist, When fetchPurchasedForUser is called, Then it should throw an error', async () => {
    (userDb.findByUsername as jest.Mock).mockResolvedValue(null);

    await expect(gameService.fetchPurchasedForUser('nonexistentuser')).rejects.toThrow("service layer was unable to find id");
});

// Test for fetchPurchasedForUser - no purchased games
test('Given the user exists but has no purchased games, When fetchPurchasedForUser is called, Then it should throw an error', async () => {
    (userDb.findByUsername as jest.Mock).mockResolvedValue({ getId: () => 1 });
    (gameDb.findPurchased as jest.Mock).mockResolvedValue(null);

    await expect(gameService.fetchPurchasedForUser('testuser')).rejects.toThrow("service did not receive fetched games from database");
});