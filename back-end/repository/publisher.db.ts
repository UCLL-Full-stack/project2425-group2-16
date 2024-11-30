import { Publisher } from "../model/publisher";
import database from '../util/database';

const getAllPublishers = async (): Promise<Publisher[]> => {
    try {
        const publishersPrisma = await database.publisher.findMany();
        return publishersPrisma.map((publishersPrisma) => Publisher.from(publishersPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllPublishers,
};