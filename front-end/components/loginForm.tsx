import React, { FormEvent, useState } from 'react';
import { Login } from "@types"; 
import userService from '@services/UserService';

const LoginForm: React.FC = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // New state for loading

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setMessage(''); // Clear message on submit
        setLoading(true); // Set loading state

        const credentials: Login = { 
            emailAddress: emailAddress,
            password: password
        };

        try {
            const data = await userService.loginUser(credentials);
            console.log('User logged in successfully:', data);
            setMessage("User logged in successfully!");
        } catch (error) {
            console.error(error); // Log error for debugging
            setMessage("There was an error logging the user in.");
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </>
    );
};

export default LoginForm;
