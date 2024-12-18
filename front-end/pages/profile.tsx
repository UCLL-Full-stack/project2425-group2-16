import NavBar from "@components/navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import UserOverview from "@components/userOverview";
import { User } from "@types";
import UserService from "@services/UserService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from 'next';
import React from "react";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [fullUser, setFullUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullUser(undefined);
    setError(null);
    const fetchUser = async () => {
      try {
        const user = await UserService.fetchUser();
        setFullUser(user);
      } catch (error) {
        setError(t('Lil whoopsie lmao'));
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>{t('pages.Profile')}</title>
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
          <p>{t('message.userFail')}</p>
        </div>
      )}
    </>
  );
};



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};


export default ProfilePage;
