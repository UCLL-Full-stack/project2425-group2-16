import { FavoritesList } from "../../model/favoritesList";
import { User } from "../../model/user";
import { Game } from "../../model/game";

describe('FavoritesList Model', () => {
    let user: User;
    let game1: Game;
    let game2: Game;
    let favoritesList: FavoritesList;

    beforeEach(() => {
        user = new User({
            id: 1,
            username: 'Test User',
            phoneNumber: BigInt(1234567890),
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            role: 'standard', // Adjust the role as necessary
        });
        game1 = new Game({
            id: 1,
            title: 'Game 1',
            genre: 'Genre 1',
            rating: 4.5,
            supportedLanguages: 'English',
            price: 59.99,
            systemRequirements: 'Windows 10',
            releaseDate: new Date('2022-01-01'),
            multiplayer: true,
            publisherId: 1
        });
        game2 = new Game({
            id: 2,
            title: 'Game 2',
            genre: 'Genre 2',
            rating: 4.0,
            supportedLanguages: 'English',
            price: 49.99,
            systemRequirements: 'Windows 10',
            releaseDate: new Date('2022-02-01'),
            multiplayer: false,
            publisherId: 2
        });
        favoritesList = new FavoritesList({
            id: 1,
            privacySettings: true,
            description: 'Test Description',
            owner: user,
            games: [game1]
        });
    });

    it('should create a FavoritesList instance', () => {
        expect(favoritesList).toBeInstanceOf(FavoritesList);
        expect(favoritesList.getId()).toBe(1);
        expect(favoritesList.getPrivacySettings()).toBe(true);
        expect(favoritesList.getDescription()).toBe('Test Description');
        expect(favoritesList.getOwner()).toBe(user);
        expect(favoritesList.getGames()).toEqual([game1]);
    });

    it('should add a game to the favorites list', () => {
        favoritesList.addGame(game2);
        expect(favoritesList.getGames()).toEqual([game1, game2]);
    });

    it('should remove a game from the favorites list', () => {
        favoritesList.addGame(game2);
        favoritesList.removeGame(game1.id);
        expect(favoritesList.getGames()).toEqual([game2]);
    });

    it('should set and get privacy settings', () => {
        favoritesList.setPrivacySettings(false);
        expect(favoritesList.getPrivacySettings()).toBe(false);
    });

    it('should set and get description', () => {
        favoritesList.setDescription('New Description');
        expect(favoritesList.getDescription()).toBe('New Description');
    });

    it('should set and get owner', () => {
        const newUser = new User({
            id: 2,
            username: 'New User',
            phoneNumber: BigInt(9876543210),
            emailAddress: 'new@example.com',
            birthDate: new Date('1995-05-05'),
            password: 'newSecurePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+2',
            country: 'NewCountryName',
            role: 'standard', // Adjust the role as necessary
        });
        favoritesList.setOwner(newUser);
        expect(favoritesList.getOwner()).toBe(newUser);
    });

    it('should set and get games', () => {
        favoritesList.setGames([game2]);
        expect(favoritesList.getGames()).toEqual([game2]);
    });

});