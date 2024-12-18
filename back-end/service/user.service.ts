import { Serializer } from "v8";
import { ServiceError } from "../errors/ServiceError";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, Login, UserInput, authenticateInput } from "../types";
import bcrypt from 'bcrypt';
import generateJWTtoken from "../util/jwt";
import { UserRole } from "@prisma/client";
import gameDb from "../repository/game.db";
import { Purchase } from "../model/purchase";

const getAllUsers = async (role: string): Promise<Array<User>> => { 
    if (role == "moderator"){
    const users = await userDb.getAllUsers();
    return users;
    }
    else{
        throw new ServiceError('You are not authorized to view this page.');
    }
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


const authenticate = async ({emailAddress, password, role}: authenticateInput): Promise<AuthenticationResponse> => {
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

const updatePurchasedGames = async (user: User, gameId: number): Promise<void> => {
    try {
        const game = await gameDb.findById(gameId);
    
        user.addPurchasedGame(game);
    
        await userDb.updatePurchases(user); // Removed the extra parenthesis
    }
    catch(error) { 
        throw new ServiceError("aaaaaa")
    }

}
const addPayment = async (
    username: string,
    amount: number,
    currency: string,
    gameId: number,
    time: string,
): Promise<void> => {

    const purchaseTime = new Date(time); // This will create a Date object from the ISO string
    if (!username || !amount || !currency || !time || !gameId) {
        console.log('my bad bro');
        
        throw new Error("Invalid input: All fields are required.");
    }

    if (typeof amount !== 'number' || amount <= 0) {
        console.log('my bad bro');
        
        throw new Error("Invalid amount: Must be a positive number.");
    }

    if (!(purchaseTime instanceof Date) || isNaN(purchaseTime.getTime())) {
        console.log('my bad bro');
        throw new Error("Invalid time: Must be a valid Date object.");
    }

    try {
        // Check if the user exists in the database
        console.log("starten kugel schugel")
        const user = await userDb.findByUsername(username); // Add `await` to handle async if necessary
        if (!user) {
            throw new Error(`User not found: ${username}`);
        }
        console.log(user.getUsername());
        // Get the user ID
        const userId = user.getId();
        if (!userId) {
            throw new Error("Invalid user: Unable to retrieve user ID.");
        }
        const game = await gameDb.findById(gameId);
        // Add the payment record to the database
        const paymentToSave = new Purchase({user, game, amountPayed: amount, currency, dateOfPurchase: purchaseTime})
        await userDb.addPayment(paymentToSave);
    } catch (error: any) {
        console.error("Service error:", error);
        throw new Error(`An error occurred while processing the payment. Please try again.`);
    }
};



export default  {
    addPayment,
    updatePurchasedGames,
    getAllUsers,
    saveNewUser,
    calculateAge,
    authenticate,
    findByUsername
};