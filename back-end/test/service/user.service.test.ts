import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import gameDb from '../../repository/game.db';
import { User } from '../../model/user';
import { Purchase } from '../../model/purchase';
import bcrypt from 'bcrypt';
import { ServiceError } from '../../errors/ServiceError';

jest.mock('../../repository/user.db');
jest.mock('../../repository/game.db');

const mockUser = {
    id: 1,
    username: 'testuser',
    phoneNumber: '1234567890',
    emailAddress: 'testuser@example.com',
    birthDate: new Date('1990-01-01'),
    password: 'hashedpassword',
    accountCreationDate: new Date(),
    timeZone: 'UTC',
    country: 'USA',
    age: 30,
    role: 'standard'
};

beforeEach(() => {
    jest.clearAllMocks();
});

// Test for getAllUsers
test('Given the database has users, When getAllUsers is called, Then it should return all users', async () => {
    (userDb.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

    const users = await userService.getAllUsers();

    expect(users).toEqual([mockUser]);
    expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
});

// Test for findByUsername - user found
test('Given the user exists, When findByUsername is called with an existing username, Then it should return the user', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);

    const user = await userService.findByUsername('testuser');

    expect(user).toEqual(mockUser);
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('testuser');
});

// Test for findByUsername - user not found
test('Given the user does not exist, When findByUsername is called with a non-existing username, Then it should throw an error', async () => {
    (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);

    await expect(userService.findByUsername('nonexistentuser')).rejects.toThrow("error dawg");
    expect(userDb.getUserByUsername).toHaveBeenCalledWith('nonexistentuser');
});

// Test for calculateAge
test('Given a birth date, When calculateAge is called, Then it should return the correct age', () => {
    const birthDate = new Date('1990-01-01');
    const age = userService.calculateAge(birthDate);

    expect(age).toBe(new Date().getFullYear() - 1990);
});


// // Test for authenticate - valid credentials
// test('Given valid credentials, When authenticate is called, Then it should return an authentication response', async () => {
//     (userDb.getUser ByEmail as jest.Mock).mockResolvedValue(mockUser );
//     (bcrypt.compare as jest.Mock).mockResolvedValue(true);

//     const response = await userService.authenticate({
//         emailAddress: 'testuser@example.com',
//         password: 'password', // This is the plain password
//         role: 'standard'
//     });

//     expect(response).toHaveProperty('token');
//     expect(response).toHaveProperty('username', 'testuser');
//     expect(response).toHaveProperty('role', 'standard');
// });

// // Test for authenticate - invalid credentials
// test('Given invalid credentials, When authenticate is called, Then it should throw a ServiceError', async () => {
//     (userDb.getUser ByEmail as jest.Mock).mockResolvedValue(mockUser );
//     (bcrypt.compare as jest.Mock).mockResolvedValue(false);

//     await expect(userService.authenticate({
//         emailAddress: 'testuser@example.com',
//         password: 'wrongpassword',
//         role: 'standard'
//     })).rejects.toThrow(ServiceError);
// });

// // Test for updatePurchasedGames - game found
// test('Given the game exists, When updatePurchasedGames is called, Then it should update the user\'s purchased games', async () => {
//     const mockGame = { id: 1, title: 'Test Game' };

//     (gameDb.findById as jest.Mock).mockResolvedValue(mockGame);
//     (userDb.updatePurchases as jest.Mock).mockResolvedValue(undefined);

//     await expect(userService.updatePurchasedGames(mockUser , 1)).resolves.toBeUndefined();
//     expect(gameDb.findById).toHaveBeenCalledWith(1);
//     expect(userDb.updatePurchases).toHaveBeenCalledWith(mockUser );
// });

// // Test for updatePurchasedGames - game not found
// test('Given the game does not exist, When updatePurchasedGames is called, Then it should throw a ServiceError', async () => {
//     (gameDb.findById as jest.Mock).mockResolvedValue(null);

//     await expect(userService.updatePurchasedGames(mockUser , 999)).rejects.toThrow(ServiceError);
//     expect(gameDb.findById).toHaveBeenCalledWith(999);
// });

// // Test for addPayment - valid input
// test('Given valid input, When addPayment is called, Then it should add the payment', async () => {
//     const mockGame = { id: 1, title: 'Test Game' };
//     const mockPurchase = new Purchase({
//         user: mockUser ,
//         game: mockGame,
//         amountPayed: 19.99,
//         currency: 'USD',
//         dateOfPurchase: new Date()
//     });

//     (userDb.findByUsername as jest.Mock).mockResolvedValue(mockUser );
//     (gameDb.findById as jest.Mock).mockResolvedValue(mockGame);
//     (userDb.addPayment as jest.Mock).mockResolvedValue(undefined);

//     await expect(userService.addPayment('testuser', 19.99, 'USD', new Date().toISOString(), 1)).resolves.toBeUndefined();
//     expect(userDb.findByUsername).toHaveBeenCalledWith('testuser');
//     expect(gameDb.findById).toHaveBeenCalledWith(1);
//     expect(userDb.addPayment).toHaveBeenCalledWith(expect.any(Purchase));
// });

// // Test for addPayment - user not found
// test('Given the user does not exist, When addPayment is called, Then it should throw an error', async () => {
//     (userDb.findByUsername as jest.Mock).mockResolvedValue(null);

//     await expect(userService.addPayment('nonexistentuser', 19.99, 'USD', new Date().toISOString(), 1)).rejects.toThrow("User  not found: nonexistentuser");
//     expect(userDb.findBy Username).toHaveBeenCalledWith('nonexistentuser');
// });

// // Test for addPayment - invalid amount
// test('Given an invalid amount, When addPayment is called, Then it should throw an error', async () => {
//     await expect(userService.addPayment('testuser', -10, 'USD', new Date().toISOString(), 1)).rejects.toThrow("Invalid amount: Must be a positive number.");
// });