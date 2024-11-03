import { User } from "../model/user";

const users = [
        new User({
            username: "John",
            phoneNumber: 1234567890,
            emailAddress: "john.doe@example.com",
            birthDate: new Date('1990-05-15'),
            password: "securePassword123",
            accountCreationDate: new Date(),
            timeZone: "GMT+1",
            country: "Canada",
            age: 34,
        }),
        new User({
            username: "Jane",
            phoneNumber: 9876543210,
            emailAddress: "jane.smith@example.com",
            birthDate: new Date('1985-10-20'),
            password: "anotherSecurePassword",
            accountCreationDate: new Date(),
            timeZone: "GMT+5",
            country: "ALBANIA",
            age: 39,
        }),
        new User({
            username: "Mike",
            phoneNumber: 1122334455,
            emailAddress: "mike.jones@example.com",
            birthDate: new Date('2000-08-05'),
            password: "password12345",
            accountCreationDate: new Date(),
            timeZone: "GMT-4",
            country: "ENGLAND AMERIKA",
            age: 24,
        })
    ];
    
const getAllUsers = (): Array<User> => {
    return users;
}

const save = (user: User): User =>  {
    users.push(user);
    return user;
}


export default {
    getAllUsers,
    save
}