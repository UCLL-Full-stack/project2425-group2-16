
import { PrismaClient, UserRole } from "@prisma/client";
import { User } from "../model/user";
import database from '../util/database';
import { Purchase } from "../model/purchase";


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


const findByUsername = async (username: string): Promise<User | null> => { 
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

const addPayment = async (purchaseDetails: Purchase): Promise<void> => { 
    try { 
        const user = purchaseDetails.getUser();
        const game = purchaseDetails.getGame();

        if (!user || !game) {
        throw new Error("Invalid purchase details: user or game is missing.");
        }


        const payment = await database.purchase.create({
            data: { 
                userId: purchaseDetails.getUser().getId(),
                amountPayed: purchaseDetails.getAmountPayed(),
                currency: purchaseDetails.getCurrency(),
                dateOfPurchase: purchaseDetails.getDateOfPurchase(),
                gameId: purchaseDetails.getGame().getId()
            }
        })
    } catch (error) { 
        console.error(error)
        if (error instanceof Error) {
            throw new Error(`database error`);
        } else {
            throw new Error('database error: unknown error');
        }
    }
}
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
                role: user.getRole(), // Add this line to specify the role

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

const findByEmail = async (emailAddress: string): Promise<User | null> => { 
    try { 
        const userPrisma = await database.user.findFirst({
            where: { emailAddress }
        })
        if (!userPrisma) { 
            return null;
        }
        return User.from({
            ...userPrisma
        })
    } catch (error) { 
        console.error(error);
        throw new Error("Database error")
    }
}

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
const prisma = new PrismaClient();

const updatePurchases = async (inputUser: User): Promise<void> => {
    try {
        const games = inputUser.getPurchasedGames();

        const purchasedGames = games.map(gamee => ({
            userId: inputUser.id,
            gameId: Number(gamee.getId()),
        }));

        await prisma.$transaction(async (transactionPrisma) => {
            // Loop over the purchased games and add only the new ones that are not already in the database
            await Promise.all(
                purchasedGames.map(async (purchase) => {
                    // Check if the purchase already exists in the database
                    const existingPurchase = await transactionPrisma.purchasedGameUser.findFirst({
                        where: {
                            userId: inputUser.id,
                            gameId: purchase.gameId,
                        },
                    });

                    // If the purchase doesn't exist, add it
                    if (!existingPurchase) {
                        await transactionPrisma.purchasedGameUser.create({
                            data: purchase,
                        });
                    }
                })
            );
        });

        console.log("User purchases updated successfully");
    } catch (error) {
        console.error("Error updating user purchases:", error);
        throw new Error("Failed to update user purchases");
    }
};



export default {
    findByEmail,
    updatePurchases,
    getAllUsers,
    saveUser,
    getUserByEmail,
    getUserByUsername,
    getUserByPhone,
    findById,
    findByUsername,
    addPayment
};

