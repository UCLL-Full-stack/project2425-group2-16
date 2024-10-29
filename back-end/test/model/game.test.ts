import { Game } from '../../model/game';
import { DomainError } from '../../errors/DomainError';

const validGameData = {
    genre: "Action",
    rating: 4.5,
    supportedLanguages: "English, Spanish, French",
    title: "Cyber Battle",
    price: 59.99,
    systemRequirements: "8GB RAM, GTX 1050, 50GB Storage",
    releaseDate: new Date("2023-04-20"),
    multiplayer: true
};

// Helper function to create a Game with given parameters
const createGame = (overrides: Partial<typeof validGameData>) => {
    return new Game({ ...validGameData, ...overrides });
};

test('Given valid game data, when creating a Game, then it should be created successfully', () => {
    const game = createGame({});
    expect(game.getTitle()).toBe(validGameData.title);
    expect(game.getGenre()).toBe(validGameData.genre);
    expect(game.getRating()).toBe(validGameData.rating);
    expect(game.getPrice()).toBe(validGameData.price);
    expect(game.getSystemRequirements()).toBe(validGameData.systemRequirements);
    expect(game.getReleaseDate()).toBe(validGameData.releaseDate);
    expect(game.isMultiplayer()).toBe(validGameData.multiplayer);
});

test('Given a rating over 5, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ rating: 6 })).toThrow(DomainError);
});

test('Given a rating below 0, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ rating: -1 })).toThrow(DomainError);
});

test('Given a title longer than 40 characters, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ title: 'a'.repeat(41) })).toThrow(DomainError);
});

test('Given an empty title, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ title: '' })).toThrow(DomainError);
});

test('Given an empty genre, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ genre: '' })).toThrow(DomainError);
});

test('Given empty system requirements, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ systemRequirements: '' })).toThrow(DomainError);
});

test('Given a negative price, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ price: -10 })).toThrow(DomainError);
});

test('Given undefined multiplayer status, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ multiplayer: undefined })).toThrow(DomainError);
});

test('Given null multiplayer status, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ multiplayer: null as unknown as boolean })).toThrow(DomainError);
});

test('Given unsupported languages that are not a string, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ supportedLanguages: 123 as unknown as string })).toThrow(DomainError);
});

test('Given an empty supported languages string, when creating a Game, then it should throw DomainError', () => {
    expect(() => createGame({ supportedLanguages: '' })).toThrow(DomainError);
});
