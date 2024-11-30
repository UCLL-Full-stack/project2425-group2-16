import { Game } from "../model/game";
import { Purchase } from "../model/purchase";
import { User } from "../model/user";
import database from '../util/database';

const getAllPurchases = async (): Promise<Purchase[]> => {
    try {
        const purchasesPrisma = await database.purchase.findMany();
        return Promise.all(purchasesPrisma.map(async (purchasesPrisma) => {
            const userPrisma = await database.user.findUnique({ where: { id: purchasesPrisma.userId } }) ?? (() => { throw new Error('User not found'); })();
            return Purchase.from({
                dateOfPurchase: purchasesPrisma.dateOfPurchase,
                currency: purchasesPrisma.currency,
                amountPayed: purchasesPrisma.amountPayed,
                user: User.from({
                    ...userPrisma,
                    phoneNumber: Number(userPrisma.phoneNumber)
                }),
                game: await (async () => {
                    const game = await database.game.findUnique({ where: { id: purchasesPrisma.gameId } });
                    if (!game) throw new Error('Game not found');
                    return Game.from(game);
                })()
            });
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllPurchases,
};