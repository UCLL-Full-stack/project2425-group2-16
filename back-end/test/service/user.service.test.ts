import userService from '../../service/user.service';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbSave: jest.Mock;

const userInput: UserInput = {
    emailAddress: 'jane.doe@example.com',
    phoneNumber: 1234567890,
    birthDate: new Date('1990-01-01'),
    password: 'securePassword123',
    accountCreationDate: new Date(),
    timeZone: 'UTC',
    country: 'USA',
    age: 33
};

const createMockUser = (overrides: Partial<typeof userInput> = {}): User => {
    return new User({ ...userInput, ...overrides });
};

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbSave = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('getAllUsers should return all users', () => {
    // Given
    const users = [createMockUser(), createMockUser({ emailAddress: "john.doe@example.com" })];
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(users);

    // When
    const result = userService.getAllUsers();

    // Then
    expect(result).toEqual(users);
    expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
});

test('saveNewUser should save a new user if they do not already exist', () => {
    // Given
    const newUser = createMockUser();
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue([]); // No existing users
    userDb.save = mockUserDbSave.mockReturnValue(newUser); // Mock saving the user

    // When
    const result = userService.saveNewUser(newUser);

    // Then
    expect(result).toEqual(newUser);
    expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
    expect(userDb.save).toHaveBeenCalledWith(newUser);
});

test('saveNewUser should throw an error if the user already exists', () => {
    // Given
    const existingUser = createMockUser();
    const duplicateUser = createMockUser({ emailAddress: existingUser.getEmailAddress() });

    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue([existingUser]); // Existing user

    // When
    const createInvalidUser = () => userService.saveNewUser(duplicateUser);

    // Then
    expect(createInvalidUser).toThrow('User already exists');
    expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
    expect(userDb.save).not.toHaveBeenCalled();
});
