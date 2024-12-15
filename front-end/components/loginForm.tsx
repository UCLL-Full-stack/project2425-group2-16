import React, { FormEvent, useState } from 'react';
import { Login } from "@types"; 
import userService from '@services/UserService';
import router from 'next/router';
import { stringify } from 'querystring';

const LoginForm: React.FC = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('');
    const [role, setRole] = useState<string>('standard')
    const [loading, setLoading] = useState<boolean>(false); // New state for loading

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage(''); // Clear message on submit
        setLoading(true); // Set loading state

        const credentials: Login = { 
            emailAddress: emailAddress,
            password: password,
            role: role
        };

        try {
            console.log('Submitting credentials:', credentials);
            const data = await userService.loginUser(credentials);
            console.log('User logged in successfully:', data);
            sessionStorage.setItem("loggedInUser", JSON.stringify(data));
            setMessage("User logged in successfully! Redirecting...");
            setTimeout(() => {
                router.push("/");
            }, 1000);
            
        } catch (error) {
            console.error(error); // Log error for debugging
            if (error instanceof Error) {
                console.log(error);
                setMessage(`There was an error logging the user in: ${error.message}`);
            } else {
                setMessage('There was an unknown error logging the user in.');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="textInputField"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>
                
                <div className="inputDiv">
                    <input
                        type="password"
                        placeholder="Password"
                        className="textInputField"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <label>
                <input type="checkbox" />
                Login as a lambrgmbr
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </>
    );
};

export default LoginForm;
