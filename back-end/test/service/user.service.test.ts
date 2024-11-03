import userService from '../../service/user.service';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';
import { ServiceError } from "../../errors/ServiceError"; // Import ServiceError for checking in tests

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbSave: jest.Mock;

const userInput: UserInput = {
    username: "jfpowie",
    emailAddress: 'jane.doe@example.com',
    phoneNumber: 1234567890,
    birthDate: new Date('1990-01-01'),
    password: 'securePassword123',
    accountCreationDate: new Date(),
    timeZone: 'UTC',
    country: 'USA',
    age: 34
};

const createMockUser = (overrides: Partial<typeof userInput> = {}): User => {
    return new User({ ...userInput, ...overrides });
};

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbSave = jest.fn();
    userDb.getAllUsers = mockUserDbGetAllUsers; // Set the mock functions here
    userDb.save = mockUserDbSave;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('getAllUsers should return all users', () => {
    // Given
    const users = [createMockUser(), createMockUser({ emailAddress: "john.doe@example.com" })];
    mockUserDbGetAllUsers.mockReturnValue(users); // Use mock directly

    // When
    const result = userService.getAllUsers();

    // Then
    expect(result).toEqual(users);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test('saveNewUser should save a new user if they do not already exist', async () => {
    // Given
    const newUser = createMockUser();
    mockUserDbGetAllUsers.mockReturnValue([]); // No existing users
    mockUserDbSave.mockReturnValue(Promise.resolve(newUser)); // Mock saving the user

    // When
    const result = await userService.saveNewUser(newUser); // Await the promise

    // Then
    expect(result).toEqual(newUser);
    expect(mockUserDbSave).toHaveBeenCalledWith(newUser);
});

test('saveNewUser should throw an error if the user already exists', async () => {
    // Given
    const existingUser = createMockUser();
    const duplicateUser = createMockUser({ emailAddress: existingUser.getEmailAddress() });

    mockUserDbGetAllUsers.mockReturnValue([existingUser]); // Existing user

    // When & Then
    await expect(userService.saveNewUser(duplicateUser)).rejects.toThrow(ServiceError); // Use rejects to handle async error
    await expect(userService.saveNewUser(duplicateUser)).rejects.toThrow('User already exists');
});

test('logInUser should return success message if credentials are correct', () => {
    // Given
    const existingUser = createMockUser();
    const credentials = { emailAddress: existingUser.getEmailAddress(), password: existingUser.getPassword() };

    mockUserDbGetAllUsers.mockReturnValue([existingUser]); // Existing user

    // When
    const result = userService.logInUser(credentials);

    // Then
    expect(result).toBe("User logged in successfully");
});

test('logInUser should throw an error if the user is not found', () => {
    // Given
    const credentials = { emailAddress: "nonexistent@example.com", password: "somePassword" };

    mockUserDbGetAllUsers.mockReturnValue([]); // No users

    // When & Then
    expect(() => userService.logInUser(credentials)).toThrow(ServiceError);
    expect(() => userService.logInUser(credentials)).toThrow("User not found");
});

test('logInUser should throw an error if the password is incorrect', () => {
    // Given
    const existingUser = createMockUser();
    const credentials = { emailAddress: existingUser.getEmailAddress(), password: "wrongPassword" };

    mockUserDbGetAllUsers.mockReturnValue([existingUser]); // Existing user

    // When & Then
    expect(() => userService.logInUser(credentials)).toThrow(ServiceError);
    expect(() => userService.logInUser(credentials)).toThrow("Incorrect password.");

});

test('calculateAge should return the correct age based on birthDate', () => {
    // Given
    const birthDate = new Date('1990-01-01');
    let expectedAge = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference = new Date().getMonth() - birthDate.getMonth();
    
    // Adjust expected age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && new Date().getDate() < birthDate.getDate())) {
        expectedAge = expectedAge - 1;
    }

    // When
    const result = userService.calculateAge(birthDate);

    // Then
    expect(result).toBe(expectedAge);
});
