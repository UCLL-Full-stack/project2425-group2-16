import { FavoritesList } from "@types";

const ListService = {
    fetchByUser: async (username: string): Promise<FavoritesList[]> => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch(`http://localhost:3000/favorites/getList?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        console.log('Games fetched successfully');
        return response.json();
    },

    addGameToFavorites: async (username: string, id: number): Promise<FavoritesList[]> => {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch(`http://localhost:3000/favorites/add?username=${username}&gameId=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        console.log('Game added to favorites successfully');
        return response.json();
    },
};

export default ListService;
