import NavBar from "@components/navbar";
import RegisterForm from "@components/registerForm";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head"
import React from "react";

const Home: React.FC = () => { 

  const { t } = useTranslation();

    return (
        <>
        <Head>
        <title>{t('pages.Register')}</title>
        <meta name="description" content="Courses app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <NavBar></NavBar>
        </header>
            <RegisterForm></RegisterForm>


        
        
        
        
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


export default Home;