import favoritesListDb from '../../repository/favoritesList.db';
import gameDb from '../../repository/game.db';
import userDb from '../../repository/user.db';
import { FavoritesList } from '../../model/favoritesList';
import { User } from '../../model/user';
import listService from '../../service/list.service';
import { UserRole } from '@prisma/client';

jest.mock('../../repository/favoritesList.db');
jest.mock('../../repository/game.db');
jest.mock('../../repository/user.db');


const mockUser = {
    id: 1,
    username: 'gamer123',
    phoneNumber: BigInt(1234567890),
    emailAddress: 'gamer123@example.com',
    birthDate: new Date('2000-01-01'),
    password: 'securePassword123',
    accountCreationDate: new Date(),
    timeZone: 'GMT+1',
    country: 'CountryName',
    role: UserRole.standard
};
const mockFavoritesList = { 
    id: 1, 
    userId: 1, 
    games: [], 
    privacySettings: true, 
    description: 'Favorite games list', 
    owner: new User(mockUser) 
};

beforeEach(() => {
    jest.clearAllMocks();
});

// Test for fetchByUsername - user found, favorites list found
test('Given the user exists and has a favorites list, When fetchByUsername is called, Then it should return the favorites list', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (favoritesListDb.findByUserId as jest.Mock).mockResolvedValue(mockFavoritesList);

    FavoritesList.fromObjectAsync = jest.fn().mockResolvedValue(new FavoritesList(mockFavoritesList));

    const result = await listService.fetchByUsername('gamer123');

    expect(result).toEqual(expect.any(FavoritesList));
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('gamer123');
    expect(favoritesListDb.findByUserId).toHaveBeenCalledWith(mockUser.id);
});


// Test for fetchByUsername - user not found
test('Given the user does not exist, When fetchByUsername is called, Then it should return null', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);

    const result = await listService.fetchByUsername('nonexistentuser');

    expect(result).toBeNull();
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('nonexistentuser');
});

// Test for fetchByUsername - user found, favorites list not found
test('Given the user exists but has no favorites list, When fetchByUsername is called, Then it should return null', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (favoritesListDb.findByUserId as jest.Mock).mockResolvedValue(null);

    const result = await listService.fetchByUsername('gamer123');

    expect(result).toBeNull();
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('gamer123');
    expect(favoritesListDb.findByUserId).toHaveBeenCalledWith(mockUser.id);
});

// Test for addGameToFavorites - user not found
test('Given the user does not exist, When addGameToFavorites is called, Then it should throw an error', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);

    await expect(listService.addGameToFavorites('nonexistentuser', 1)).rejects.toThrow('Failed to add game to favorites. Please try again later.');
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('nonexistentuser');
});

// Test for addGameToFavorites - game not found
test('Given the user exists but the game does not exist, When addGameToFavorites is called, Then it should throw an error', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (gameDb.findById as jest.Mock).mockResolvedValue(null);

    await expect(listService.addGameToFavorites('gamer123', 999)).rejects.toThrow('Failed to add game to favorites. Please try again later.');
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('gamer123');
    expect(gameDb.findById).toHaveBeenCalledWith(999);
});

