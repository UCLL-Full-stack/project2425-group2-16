import { User } from "@types";

const userService = {
    apiUrl: 'http://localhost:3000/users/post',

    createUser: async (user: User): Promise<any> => { 
        const response = await fetch(userService.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status} ${response.statusText}`); 
        // }
        console.log('step2')
        return response.json(); 
    }
};

export default userService;
