import { User } from '../../model/user';
import { DomainError } from '../../errors/DomainError';

test('Given valid input, when creating a User, then it should create the User successfully', () => {
    const validUser = {
        username: "jpwoie",
        phoneNumber: 1234567890,
        emailAddress: 'test@example.com',
        birthDate: new Date('2000-01-01'),
        password: 'securePassword123',
        accountCreationDate: new Date(),
        timeZone: 'GMT+1',
        country: 'CountryName',
        age: 24,
    };
    const user = new User(validUser);
    expect(user.getPhoneNumber()).toBe(validUser.phoneNumber);
    expect(user.getEmailAddress()).toBe(validUser.emailAddress);
    expect(user.getPurchasedGames()).toEqual([]);
});

test('Given an invalid phone number, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "asdf",
            phoneNumber: 12345, // Invalid phone number
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given an invalid email address, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "dfwie",
            phoneNumber: 1234567890,
            emailAddress: 'invalidEmail',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given a future birth date, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "pwfoiej",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('3000-01-01'), // Future birth date
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given a short password, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "fwjeir",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'short', // Invalid password
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given a future account creation date, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "wpeorij",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date('3000-01-01'), // Future date
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given an invalid time zone, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "fjowie",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'Invalid TimeZone', // Invalid time zone
            country: 'CountryName',
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given an invalid country name, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "fpowiej",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'Country123', // Invalid country name
            age: 24,
        });
    }).toThrow(DomainError);
});

test('Given a negative age, when creating a User, then it should throw DomainError', () => {
    expect(() => {
        new User({ 
            username: "wdfjowe",
            phoneNumber: 1234567890,
            emailAddress: 'test@example.com',
            birthDate: new Date('2000-01-01'),
            password: 'securePassword123',
            accountCreationDate: new Date(),
            timeZone: 'GMT+1',
            country: 'CountryName',
            age: -1, // Invalid age
        });
    }).toThrow(DomainError);
});



