import { User } from "../../model/user";

test('given underaged user, when trying to create user profile, then error is thrown', () => {

    
    const createUnderagedUser = () => {
    new User({
        phoneNumber: 987654321110,
        emailAddress: "jane.smith@example.com",
        birthDate: new Date('1985-10-20'),
        password: "anotherSecurePassword",
        accountCreationDate: new Date(),
        timeZone: "GMT+5",
        country: "ALBANIA",
        age: 3,
    });
    };

    expect(createUnderagedUser).toThrow('underaged users can not register, grow up at first lil bro');
    
})



test('given User with short password as an input when registering then error is thorwn', () => {
    const createNewUser = () => { 
        const user = new User({
            phoneNumber: 987654321110,
            emailAddress: "jane.smith@example.com",
            birthDate: new Date('1985-10-20'),
            password: "mesi",
            accountCreationDate: new Date(),
            timeZone: "GMT+5",
            country: "ALBANIA",
            age: 15,    });
    }
    expect(createNewUser).toThrow('password must be at least 8 charcaters long')
})
