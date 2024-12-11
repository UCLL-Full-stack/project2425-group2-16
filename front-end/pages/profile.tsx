import NavBar from "@components/navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import UserOverview from "@components/userOverview";
import { User } from "@types";
import UserService from "@services/UserService";

const ProfilePage: React.FC = () => {
  const [fullUser, setFullUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullUser(undefined);
    const fetchUser = async () => {
      try {
        const user = await UserService.fetchUser();
        setFullUser(user);
      } catch (error) {
        setError(
          "Failed to fetch user. Please try refreshing the page or logging out and back in."
        );
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <NavBar></NavBar>
      </header>
      {fullUser && <UserOverview user={fullUser} />}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
