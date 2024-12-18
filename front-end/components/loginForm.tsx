import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Login } from "@types"; 
import userService from '@services/UserService';
import router from 'next/router';
import { stringify } from 'querystring';
import { useTranslation } from 'next-i18next';

const LoginForm: React.FC = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [gudMessage, setGudMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    // const [role, setRole] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // New state for loading
    const { t } = useTranslation();
    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setGudMessage(''); // Clear message on submit
        setMessage('');
        setLoading(true); // Set loading state

        // const credentials: Login = { 
        //     emailAddress: emailAddress,
        //     password: password,
        //     role: role
        // };

        try {
            // setRole(role)
            // console.log('Submitting credentials:', credentials);
            const data = await userService.loginUser({emailAddress, password});
            console.log('User logged in successfully:', data);
            sessionStorage.setItem("loggedInUser", JSON.stringify(data));
            setGudMessage(t('status.loginGud'));
            setTimeout(() => {
                router.push("/");
            }, 1000);
            
        } catch (error) {
            console.error(error); // Log error for debugging
            if (error instanceof Error) {
                console.log(error);
                setMessage(t('status.loginBad'));
            } else {
                setMessage(t('status.loginTeribol'));
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        // Clear any existing timeout before setting a new one
        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
        }

        // Set the timeout to clear the message after 5 seconds
        if (message) {
            messageTimeoutRef.current = setTimeout(() => {
                setMessage('');
                messageTimeoutRef.current = null; // Reset the reference
            }, 5000);
        }

        // Cleanup timeout on component unmount
        return () => {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
        };
    }, [message]);

    return (
        <>
        <div className='centered-form-container'>
            <form onSubmit={handleSubmit} className='centered-form'>
                    <input
                        type="email"
                        placeholder={t('info.email')}
                        className="textInputField"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                
                    <input
                        type="password"
                        placeholder={t('info.password')}
                        className="textInputField"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <label>
                <input type="checkbox" />
                Login as a lambrgmbr
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? t('nav.logging in...') : t('nav.login')}
                </button>
            </form>
            </div>
            {message && <p className="popupStyle">{message}</p>}
            {gudMessage && <p className="gudPopupStyle">{gudMessage}</p>}
        </>
    );
};

export default LoginForm;
