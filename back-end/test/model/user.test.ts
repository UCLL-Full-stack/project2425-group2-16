import { User } from '../../model/user';
import { DomainError } from '../../errors/DomainError';
import { UserRole } from '@prisma/client';

test('Given valid input, when creating a User, then it should create the User successfully', () => {
    const validUser = {
        id: 1,
        username: "jpwoie",
        phoneNumber: 1234567890n,
        emailAddress: 'test@example.com',
        birthDate: new Date('2000-01-01'),
        password: 'securePassword123',
        accountCreationDate: new Date(),
        timeZone: 'GMT+1',
        country: 'CountryName',
        age: 24,
        role: UserRole.standard, // Adjust the role as necessary
    };
    const user = new User(validUser);
    expect(user.getPhoneNumber()).toBe(validUser.phoneNumber);
    expect(user.getEmailAddress()).toBe(validUser.emailAddress);
    expect(user.getPurchasedGames()).toEqual([]);
});

test('Given an invalid phone number, when creating a User, then it should throw DomainError', () => {
function createUserWithInvalidPhoneNumber() {
    return new User({ 
        id: 1,
        username: "asdf",
        phoneNumber: 12345492n, // Invalid phone number
        emailAddress: 'test@example.com',
        birthDate: new Date('2000-01-01'),
        password: 'securePassword123',
        accountCreationDate: new Date(),
        timeZone: 'GMT+1',
        country: 'CountryName',
        age: 24,
        role: 'standard',
    });
}

expect(createUserWithInvalidPhoneNumber).toThrow(DomainError);
});

test('Given an invalid email address, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            id: 5,
            username: "dfwie",
            phoneNumber: 1234567890n,
            emailAddress: 'invalidEmail',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
            role: 'standard'
        });
    }).toThrow(DomainError);
});


test('Given a short password, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            id: 19,
            username: "fwjeir",
            phoneNumber: 1234567890n,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'short', // Invalid password
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
            role: 'standard'
        });
    }).toThrow(DomainError);
});



test('Given an invalid time zone, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            id: 25,
            username: "fjowie",
            phoneNumber: 1234567890n,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'Invalid TimeZone', // Invalid time zone
            country: 'CountryName',
            age: 24,
            role: 'standard'
        });
    }).toThrow(DomainError);
});

test('Given an invalid country name, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            id: 22,
            username: "fpowiej",
            phoneNumber: 1234567890n,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'Country123', // Invalid country name
            age: 24,
            role: 'standard'
        });
    }).toThrow(DomainError);
});

test('Given a negative age, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            id: 30,
            username: "wdfjowe",
            phoneNumber: 1234567890n,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: -1, // Invalid age
            role: 'standard'
        });
    }).toThrow(DomainError);
});



