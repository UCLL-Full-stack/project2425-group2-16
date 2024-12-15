import { Game } from "@types";

const gameService = {

    // getUrl: 'http://localhost:3000//games/getAll',

    getAllGames: async (): Promise<Game[]> => { // Specify the return type
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch('http://localhost:3000/games/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log('Games fetched successfully');
        return response.json(); // This returns a promise, so it should be awaited if used directly
    },


    findGameByTitle: async (title: string): Promise<Game | null> => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        if (!title) { 
            throw new Error('title not there')
        }

        const response = await fetch(`http://localhost:3000/games/gameByTitle?title=${encodeURIComponent(title)}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

    
        if (!response.ok) {
            throw new Error(`Error: ${response.status} probleme: ${response.statusText}`);
        }
         
        const game = await response.json();
        return game; // Ensure this matches the expected return type
    },

    removeByTitle: async (title: string): Promise<void> => { 
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch(`http://localhost:3000/games/delete?title=${title}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} probleme: ${response.statusText}`);
    }

    }
}
export default gameService;


