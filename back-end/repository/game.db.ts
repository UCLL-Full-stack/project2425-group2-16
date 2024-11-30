import { Game } from "../model/game";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getAllGames = async (): Promise<Game[]> => {
    return await prisma.Game.findMany(); 
}



export default {
    getAllGames,
};