
import { UserRole } from "@prisma/client";
import { User } from "../model/user";
import database from '../util/database';


const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username }
        });

        if (!userPrisma) {
            return null;
        }

        const user = User.from(userPrisma); // Ensure this method works as expected
        return user;
    } catch (error) {
        console.error('Error while fetching user:', error);
        throw error; // Optionally rethrow the error to let the caller handle it
    }
};




const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((usersPrisma) => User.from({
            ...usersPrisma
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const saveUser = async (user: User): Promise<User> => {
    try {
        const savedUser = await database.user.create({
            data: {
                username: user.getUsername(),
                emailAddress: user.getEmailAddress(),
                birthDate: user.getBirthDate(),
                password: user.getPassword(),
                phoneNumber: BigInt(user.getPhoneNumber()),
                accountCreationDate: user.getAccountCreationDate(),
                timeZone: user.getTimeZone(),
                country: user.getCountry(),
                age: user.getAge() ?? 0,
                // add other required fields here
            }
        });
        return User.from({
            ...savedUser
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                emailAddress: email,  // Use emailAddress here
            }
        });
        if (!userPrisma) {
            return null;
        }
        return User.from({
            ...userPrisma
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



const getUserByPhone = async (phoneNumber: bigint): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                phoneNumber: phoneNumber  // Use emailAddress here
            }
        });
        if (!userPrisma) {
            return null;
        }
        return User.from({
            ...userPrisma
        });
        
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const findById = async (id: number): Promise<User | null> => { 
    try {
        const userPrisma = await database.user.findFirst({
            where: { id }
        });

        // Check if the user was found before trying to convert
        if (!userPrisma) {
            return null;  // Return null if no user is found
        }

        return User.from({
            ...userPrisma
        });

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}





export default {
    getAllUsers,
    saveUser,
    getUserByEmail,
    getUserByUsername,
    getUserByPhone,
    findById
};