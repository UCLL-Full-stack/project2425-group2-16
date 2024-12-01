import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { Login } from "../types";
import bcrypt from 'bcrypt';

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
    const existingUserEmail = await userDb.getUserByEmail(userData.getEmailAddress());
    const existingUserName = await userDb.getUserByUsername(userData.getUsername());
    const existingUserPhone = await userDb.getUserByPhone(userData.getPhoneNumber());
    if (existingUserEmail) {
        throw new ServiceError(`User with email ${existingUserEmail.getEmailAddress()} already exists.`);
    }
    if (existingUserName) {
        throw new ServiceError(`User with username ${existingUserName.getUsername()} already exists.`);
    }
    if (existingUserPhone) {
        throw new ServiceError(`User with phone number ${existingUserPhone.getPhoneNumber()} already exists.`);
    }

    const hashed = await bcrypt.hash(userData.getPassword(), 12);


    const newUser = new User({
        username: userData.getUsername(),
        phoneNumber: userData.getPhoneNumber(),
        emailAddress: userData.getEmailAddress(),
        birthDate: userData.getBirthDate(),
        password: hashed,
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