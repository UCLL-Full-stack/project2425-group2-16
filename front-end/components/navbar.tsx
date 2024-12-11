import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = (): void => {
    sessionStorage.setItem("loggedInUser", "");
    setLoggedInUser(null);
    setMessage("Log out successful. Now redirecting to homepage...")

    setTimeout(() => {
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 1000);
  };

  useEffect(() => {
    setMessage("");
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  return (
    <nav>
      <ul className="nav_list">
        <li>
          <Link href="/">Home</Link>
        </li>

        {!loggedInUser && (
          <>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Log In </Link>
            </li>
          </>
        )}
        {loggedInUser && (
          <><li>
            <Link onClick={handleLogout} href="#">
              Log Out
            </Link>
          </li><li>
            <Link href="/profile">My Profile</Link>
            </li></>
        )}
      </ul>

      {message && (
        <div style={popupStyle}>Logging out...</div>
      )}
    </nav>
  );
};

const navStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: '#333',
  padding: '10px 20px',
  color: 'white',
};

// CSS styles for the popup message
const popupStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(255, 0, 0, 0.8)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  zIndex: 9999,  // Ensure the message is above other elements
  fontSize: '16px',
  fontWeight: 'bold',
};

export default NavBar;
