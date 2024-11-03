import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { Login } from "../types";

const getAllUsers = (): Array<User> => { 
    const users = userDb.getAllUsers();
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

const saveNewUser =  async (userData: any): Promise<User> => {
    const existingUsers = userDb.getAllUsers();
    const userr = new User(userData);

    for (const existingUser of existingUsers) {
        if (existingUser.getEmailAddress() === userr.getEmailAddress()) {
            throw new ServiceError("User already exists");
        }
    }
    const hello = "hello"
    const goodBye = "goodBye"
    const userAge = calculateAge(new Date(userr.getBirthDate()));
    userr.setAge(userAge);


    // console.log('bro is saved')
    return await userDb.save(userr);
};


const logInUser = (credentials: Login): string => {
    const users = userDb.getAllUsers();
    for (const user of users){
        if (user.getEmailAddress() == credentials.emailAddress){
            if (user.getPassword() != credentials.password){
                throw new ServiceError("Incorrect password.");
            }
            else{
                return "User logged in successfully";
            }
        }
    }
    throw new ServiceError("User not found");
}


export default  {
    getAllUsers,
    saveNewUser,
    logInUser,
    calculateAge
};