import { User } from "@types";
import { Login } from "@types";

interface PurchaseData {
  creditCardNumber: string;
  civ: string;
  nameOnCard: string;
  gameId: number;
}


interface paymentRelated {
  amount: number;
  currency: string;
  time: string;
  gameId: number;
}




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
    try {
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
            'Authorization': token ? `Bearer ${token}` : ''
          },
        }
      );
      if (!response.ok) {
        // Try to parse the error response for details
        const errorResponse = await response.json().catch(() => null);
        const errorMessage =
          errorResponse?.error || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      console.log("Fetched user successfully");
      return await response.json();
    } catch (error) {
      // Re-throw the error for handling in the calling code
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  
  addPurchase: async ({ creditCardNumber, civ, nameOnCard, gameId }: PurchaseData): Promise<string> => {
    const user = sessionStorage.getItem("loggedInUser");
    const username = user ? JSON.parse(user).username : null;
    const token = user ? JSON.parse(user).token : null;

    const response = await fetch(`http://localhost:3000/users/addPurchase?username=${username}&gameId=${gameId}`, {
      method: "PUT", // Use POST for adding a purchase
      headers: {
        "Content-Type": "application/json",
        'Authorization': token ? `Bearer ${token}` : ''
      }
      // body: JSON.stringify({ creditCardNumber, civ, nameOnCard, gameId }) // Send the purchase data in the body
    });

    if (!response.ok) {
      // Try to parse the error response for details
      const errorResponse = await response.json().catch(() => null);
      const errorMessage =
        errorResponse?.error || `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData.message; // Assuming the response contains a message field
  },

  createPurchaseRecord: async ({amount, currency, time, gameId}: paymentRelated): Promise<string> => { 
    const user = sessionStorage.getItem("loggedInUser");
    const username = user ? JSON.parse(user).username : null;
    if (username == null) { 
      console.log("username is null!")
      throw new Error("username is null")
    }
    const token = user ? JSON.parse(user).token : null;
    const response = await fetch(`http://localhost:3000/users/addPayment?username=${username}`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ amount, currency, time, gameId})
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      const errorMessage =
        errorResponse?.error || `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData.message; // Assuming the response contains a message field
}
}

export default userService;