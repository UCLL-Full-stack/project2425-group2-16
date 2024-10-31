import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = (): Array<User> => { 
    const users = userDb.getAllUsers();
    return users;
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


    // console.log('bro is saved')
    return  userDb.save(userr);
};




export default  {
    getAllUsers,
    saveNewUser
};