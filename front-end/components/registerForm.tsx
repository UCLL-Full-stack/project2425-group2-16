import React, { FormEvent, useEffect, useRef, useState } from "react";
import { User } from "@types";
import { Game } from "@types";
import userService from "@services/UserService";
import router from "next/router";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0); // Initialize as number
  const [emailAddress, setEmailAddress] = useState("");
  const [birthDate, setBirthDate] = useState<string>(""); // Store as string to match input value
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [accountCreationDate] = useState<Date>(new Date());
  const [message, setMessage] = useState<string>("");
  const [gudMessage, setGudMessage] = useState<string>("");
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    setGudMessage('');

    // Convert birthDate string to Date object
    const birthDateObj = new Date(birthDate);
    const today = new Date();

    // Validate the birth date
    if (isNaN(birthDateObj.getTime()) || birthDateObj > today) {
      setMessage("Please enter a valid birth date.");
      return;
    }

    const age = today.getFullYear() - birthDateObj.getFullYear();

    const user: User = {
      id: "", // Add a default or generated id
      username: username,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      birthDate: birthDateObj, // Use Date object
      country: country,
      password: password,
      timeZone: timezone,
      accountCreationDate: accountCreationDate,
      age: age,
      purchasedGames: [] as Game[]
    };

    try {
      const data = await userService.createUser(user);
      console.log("User created successfully:", data);
      setGudMessage("User created successfully! Redirecting to homepage...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error creating the user.";
      setMessage(`There was an error creating the user: ${errorMessage}`);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    // Only update the state if the value is a valid number
    const validNumber = /^\d*$/.test(value); // Regex to allow only digits
    if (validNumber) {
      setPhoneNumber(Number(value));
    } else {
      // Optionally handle invalid input (e.g., show an error message)
      setMessage("Please enter a valid phone number.");
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
      <form onSubmit={handleSubmit} className="centered-form">
          <input
            type="text"
            placeholder="Username"
            className="textInputField"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="textInputField"
            required
            value={phoneNumber.toString()} // Convert number to string for display
            onChange={(e) => handlePhoneNumberChange(e.target.value)} // Handle phone number input
          />
          <input
            type="email"
            placeholder="Email Address"
            className="textInputField"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <input
            type="date"
            placeholder="Birth Date"
            className="textInputField"
            required
            value={birthDate} // Use the state string for input value
            onChange={(e) => setBirthDate(e.target.value)} // Update state directly with string
          />
          <input
            type="text"
            placeholder="Country"
            className="textInputField"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="textInputField"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit" onClick={() => setMessage("")}>
          Submit
        </button>
      </form>
      </div>
      {message && <p className="popupStyle">{message}</p>}
      {gudMessage && <p className="gudPopupStyle">{gudMessage}</p>}
    </>
  );
};

export default RegisterForm;
