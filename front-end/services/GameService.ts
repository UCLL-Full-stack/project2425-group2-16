import { Game } from "@types";

const gameService = {

    // getUrl: 'http://localhost:3000//games/getAll',

    getAllGames: async (): Promise<Game> => { // Specify the return type
        const response = await fetch('http://localhost:3000/games/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log('Games fetched successfully');
        return response.json(); // This returns a promise, so it should be awaited if used directly
    },


    findGameByTitle: async (title: string): Promise<Game | null> => { 
        const response = await fetch(`http://localhost:3000/games/gameByTitle?title=${encodeURIComponent(title)}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!title) { 
            throw new Error('title not there')
        }

    
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
         
        const game = await response.json();
        return game; // Ensure this matches the expected return type
    },

};

export default gameService;



// 1. pass the title to the backend (probs as a DTO?)
// 2. in the backend, controller recireves it at first and passes to the service 
// 3. service passes it to the database where query will be made
// 4.them the returned game comes back here, in GameService as A DTO.
// 5. that DTO will be mapped to the readl object and returned