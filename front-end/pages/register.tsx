import NavBar from "@components/navbar";
import RegisterForm from "@components/registerForm";
import Head from "next/head"


const Home: React.FC = () => { 

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
            <RegisterForm></RegisterForm>


        
        
        
        
        </>
    );
};

export default Home;