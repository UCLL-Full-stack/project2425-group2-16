import { User } from "../model/user"
import userDb from "../repository/user.db";

const getAllUsers = (): Array<User> => { 
    const users = userDb.getAllUsers();
    return users;
}

const saveNewUser = (user: User): User => {
    return userDb.save(user);
};




export default  {
    getAllUsers,
    saveNewUser
};