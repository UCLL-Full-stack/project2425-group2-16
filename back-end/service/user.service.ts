import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { Login } from "../types";

const getAllUsers = async (): Promise<Array<User>> => { 
    const users = await userDb.getAllUsers();
    return users;
}

const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

const saveNewUser =  async (userData: User): Promise<User> => {
    const existingUser = await userDb.getUserByEmail(userData.getEmailAddress());
    if (existingUser) {
        throw new ServiceError("User already exists.");
    }

    const newUser = new User({
        username: userData.getUsername(),
        phoneNumber: userData.getPhoneNumber(),
        emailAddress: userData.getEmailAddress(),
        birthDate: userData.getBirthDate(),
        password: userData.getPassword(),
        accountCreationDate: userData.getAccountCreationDate(),
        timeZone: userData.getTimeZone(),
        country: userData.getCountry(),
        age: userData.getAge() ?? undefined
    });
    await userDb.saveUser(newUser);
    return newUser;
};


const logInUser = async (credentials: Login): Promise<string> => {
    const user = await userDb.getUserByEmail(credentials.emailAddress);
    if (!user) {
        throw new ServiceError("User not found");
    }
    if (user.getPassword() !== credentials.password) {
        throw new ServiceError("Incorrect password");
    }
    return "User logged in successfully";
}


export default  {
    getAllUsers,
    saveNewUser,
    logInUser,
    calculateAge
};