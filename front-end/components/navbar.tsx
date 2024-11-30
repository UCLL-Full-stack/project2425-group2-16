import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = (): void => {
    sessionStorage.setItem("loggedInUser", "")
    setLoggedInUser(null);
  }

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  });

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
        {loggedInUser && <li>
              <Link onClick={handleLogout} href={""}>Log Out</Link>
            </li>}
        <li>some other thing</li>
        <li>some other thing</li>
        <li>some other thing</li>
      </ul>
    </nav>
  );
};

export default NavBar;
