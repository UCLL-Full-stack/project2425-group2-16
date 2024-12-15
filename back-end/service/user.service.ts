import { Serializer } from "v8";
import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, Login, UserInput } from "../types";
import bcrypt from 'bcrypt';
import generateJWTtoken from "../util/jwt";
import { UserRole } from "@prisma/client";

const getAllUsers = async (): Promise<Array<User>> => { 
    const users = await userDb.getAllUsers();
    return users;
}

const findByUsername = async (username: string): Promise<User> => {
    const user = await userDb.getUserByUsername(username);
    if (user) {
        return user;
    } else {
        throw new Error("error dawg")
    }

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
        id: 10,
        username: userData.getUsername(),
        phoneNumber: userData.getPhoneNumber(),
        emailAddress: userData.getEmailAddress(),
        birthDate: userData.getBirthDate(),
        password: hashed,
        accountCreationDate: userData.getAccountCreationDate(),
        timeZone: userData.getTimeZone(),
        country: userData.getCountry(),
        age: userData.getAge() ?? undefined,
        role: userData.getRole()
    });
    await userDb.saveUser(newUser);
    return newUser;
};


const authenticate = async ({emailAddress, password, role}: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail(emailAddress);
    if (!user){
        throw new ServiceError(`Incorrect username or password.`);
    }

    const userPass = user.getPassword();
    const isOk = await bcrypt.compare(password, userPass);
    if (!isOk){
        throw new ServiceError('Incorrect username or password.');
    }
    const username = user.getUsername();
    
    const token = generateJWTtoken({username});
    return {token: token, username: username, role: role};
};





export default  {
    getAllUsers,
    saveNewUser,
    calculateAge,
    authenticate,
    findByUsername
};