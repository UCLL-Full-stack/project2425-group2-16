import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Language from "./Language";
import { useTranslation } from "next-i18next";


const NavBar: React.FC = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = (): void => {
    setRole('');
    sessionStorage.removeItem("loggedInUser");
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
    setRole('');
    setMessage("");
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
      const parsedUser = JSON.parse(user);
      const role = parsedUser.role;
      setRole(role);
    }
  }, []);

  return (
    <nav>
      <ul className="nav_list">
        <li>
          <Link className="nav_link" href="/">{t('nav.home')}</Link>
        </li>

        {!loggedInUser && (
          <>
            <li>
              <Link className="nav_link" href="/register">{t('nav.register')}</Link>
            </li>
            <li>
              <Link className="nav_link" href="/login">{t('nav.login')}</Link>
            </li>
          </>
        )}
        {loggedInUser && (
          <><li>
            <Link className="nav_link" onClick={handleLogout} href="#">
              {t('nav.logout')}
            </Link>
          </li><li>
            <Link className="nav_link" href="/profile">{t('nav.profile')}</Link>
            </li>
          {role == "moderator" && (<li>
            <Link className="nav_link" href="/users/allUsers">{t('nav.users')}</Link>
            </li>)}
            </>
        )}
      <Language></Language>
      </ul>

      {message && (
        <div style={popupStyle}>Logging out...</div>
      )}
    </nav>
  );
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
