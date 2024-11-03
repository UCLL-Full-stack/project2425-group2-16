import NavBar from "@components/navbar";
import Head from "next/head"
import GameOverview from "@components/gameOverview";


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
        <GameOverview />
        </>
    );
};

export default Home;