import { Game } from "@types";

const gameService = {

    deleteGame: async (id: number): Promise<void> => { 
        try { 

            const loggedInUser = sessionStorage.getItem("loggedInUser");
            const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
            const response = await fetch(`http://localhost:3000/games/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || "An unexpected error occurred");
            }
    
        } catch (error) {
            // Re-throw the error to pass it to the component
            throw error;
        }

    },

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

    },
    
    findPurchasedByUser: async (username: string): Promise<Game[]> => { 
        try {
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
            const response = await fetch(`http://localhost:3000/games/purchasedByUser?username=${username}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            })
            if (!response.ok) { 
                throw new Error("unable to fetch games")
            }
            const games = response.json()
            return games
        } catch(error) { 
            throw new Error("error")
        }
    }
    
}
export default gameService;


