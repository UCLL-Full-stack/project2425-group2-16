import { User } from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = (): Array<User> => { 
    const users = userDb.getAllUsers();
    return users;
}

const saveNewUser =  (userr: User): User => {
    const existingUsers = userDb.getAllUsers();
    let userExists = false;

    for (const existingUser of existingUsers) {
        if (existingUser.getEmailAddress() === userr.getEmailAddress()) {
        
            userExists = true;
            break; 
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