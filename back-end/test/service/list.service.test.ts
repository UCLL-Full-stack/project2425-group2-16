import favoritesListDb from '../../repository/favoritesList.db';
import gameDb from '../../repository/game.db';
import userDb from '../../repository/user.db';
import { FavoritesList } from '../../model/favoritesList';
import { User } from '../../model/user';
import listService from '../../service/list.service';

jest.mock('../../repository/favoritesList.db');
jest.mock('../../repository/game.db');
jest.mock('../../repository/user.db');

const mockUser = { id: 1, username: 'gamer123' };
const mockFavoritesList = { id: 1, userId: 1, games: [] };

beforeEach(() => {
    jest.clearAllMocks();
});

// Test for fetchByUsername - user found, favorites list found
test('Given the user exists and has a favorites list, When fetchByUsername is called, Then it should return the favorites list', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);
    (favoritesListDb.findByUserId as jest.Mock).mockResolvedValue(mockFavoritesList);
    (FavoritesList.fromObjectAsync as jest.Mock).mockResolvedValue(new FavoritesList(mockFavoritesList));

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
