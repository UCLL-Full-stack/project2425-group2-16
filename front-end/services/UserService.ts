import { User } from "@types";
import { Login } from "@types";

const userService = {
    apiUrl: 'http://localhost:3000/users/post',
    loginUrl: 'http://localhost:3000/users/postlogin',

    createUser: async (user: User): Promise<any> => { 
        const response = await fetch(userService.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`); 
        }
        console.log('Registration successful')
        return response.json(); 
    },


    loginUser: async (credentials: Login): Promise<any> => {
        const response = await fetch(userService.loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log('Login successful')
        return response.json();
    }
};

export default userService;
