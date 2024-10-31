import React, { FormEvent, useState } from 'react';
import { User } from "@types"; 
import userService from '@services/UserService';

const Form: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<number>(0); // Initialize as number
    const [emailAddress, setEmailAddress] = useState('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const user: User = { 
            phoneNumber,
            emailAddress,
            birthDate: birthDate || new Date(), 
            country,
            password,
            accountCreationDate: new Date(),
            // age: age || undefined,
        };

        const data = await userService.createUser(user);
        console.log('User created successfully:', data);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="textInputField"
                        required
                        value={phoneNumber.toString()} // Convert number to string for display
                        onChange={(e) => setPhoneNumber(Number(e.target.value))} // Convert string to number
                    />
                </div>
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
                        type="date"
                        placeholder="Birth Date"
                        className="textInputField"
                        required
                        onChange={(e) => setBirthDate(e.target.valueAsDate)}
                    />
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        placeholder="Country"
                        className="textInputField"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Form;
