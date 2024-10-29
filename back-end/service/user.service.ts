import { User } from "../model/user"
import userDb from "../repository/user.db";

const getAllUsers = (): Array<User> => { 
    const users = userDb.getAllUsers();
    return users;
}

const saveNewUser = (user: User): User => {
    const existingUsers = userDb.getAllUsers();
    const userExists = existingUsers.some(existingUser => existingUser.getEmailAddress() === user.getEmailAddress());

    if (userExists) {
        throw new Error('User already exists');
    }
    return userDb.save(user);
};




export default  {
    getAllUsers,
    saveNewUser
};