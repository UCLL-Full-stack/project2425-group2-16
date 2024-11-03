import { Game } from "@types";


const gameService = {
    getUrl: 'http://localhost:3000/games/getAll',


    getAllGames: async (): Promise<Game[]> => {
        const response = await fetch(gameService.getUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log('Games fetched successfully');
        return response.json();
    }
}


export default gameService;