import { User } from "../../model/user"
import userDb from "../../repository/user.db";
import userService from "../../service/user.service";



    let saveNewUserSpy: jest.SpyInstance;

    beforeEach(() => {
        saveNewUserSpy = jest.spyOn(userService, 'saveNewUser');
    })



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


test('given acceptable object body for user, when user is saved in the database, it is really saved', () => {
    const user = new User({
        phoneNumber: 987654321110,
        emailAddress: "jane.smith@example.com",
        birthDate: new Date('1985-10-20'),
        password: "anotherSecurePassword",
        accountCreationDate: new Date(),
        timeZone: "GMT+5",
        country: "ALBANIA",
        age: 15,    });

    const savingDbLayerSpy = jest.spyOn(userDb, 'save').mockImplementation()
    userService.saveNewUser(user);

    expect(savingDbLayerSpy).toHaveBeenCalledWith(user)    

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



