import Form from "@components/form";
import Head from "next/head"


const Home: React.FC = () => { 
    return (
        <>
        <Head>
        <title>Home page</title>
        <meta name="description" content="Courses app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="styles/globals.css"/>
        </Head>
        <header>
            <nav>
                <ul className="nav_list">
                    <li>register</li>
                    <li>some other thing</li>
                    <li>some other thing</li>
                    <li>some other thing</li>

                </ul>
            </nav>
        </header>
   
        <Form />


        
        
        
        
        </>
    );
};

export default Home;