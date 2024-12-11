import NavBar from "@components/navbar";
import LoginForm from "@components/loginForm";
import Head from "next/head"
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";


const LoginPage: React.FC = () => { 

  const { t } = useTranslation();

    return (
        <>
        <Head>
        <title>{t('pages.Login')}</title>
        <meta name="description" content="Courses app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <NavBar></NavBar>
        </header>
            <LoginForm></LoginForm>


        
        
        
        
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


export default LoginPage;