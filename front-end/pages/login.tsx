import NavBar from "@components/navbar";
import LoginForm from "@components/loginForm";
import Head from "next/head"


const LoginPage: React.FC = () => { 

    return (
        <>
        <Head>
        <title>Home page</title>
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

export default LoginPage;