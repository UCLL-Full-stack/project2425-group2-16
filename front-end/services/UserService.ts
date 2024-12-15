import { User } from "@types";
import { Login } from "@types";

const userService = {
  apiUrl: "http://localhost:3000/users/post",
  loginUrl: "http://localhost:3000/users/postlogin",

  createUser: async (user: User): Promise<any> => {
    const response = await fetch(userService.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.error ||
        `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    console.log("Registration successful");
    return response.json();
  },

  loginUser: async (credentials: Login): Promise<any> => {
    try {
      const response = await fetch(userService.loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        // Try to parse the error response for details
        const errorResponse = await response.json().catch(() => null);
        const errorMessage =
          errorResponse?.error || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      console.log("Login successful");
      return await response.json();
    } catch (error) {
      // Re-throw the error for handling in the calling code
      console.error("Login failed:", error);
      throw error;
    }
  },

  fetchUser: async (): Promise<User> => {
      const loggedInUser = sessionStorage.getItem("loggedInUser");
      const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
      const username = loggedInUser
        ? JSON.parse(loggedInUser).username
        : null;
      const response = await fetch(
        `http://localhost:3000/users/getByUsername?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      return response.json();
  }
    
};

export default userService;
