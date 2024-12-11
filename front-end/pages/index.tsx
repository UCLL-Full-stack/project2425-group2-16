import NavBar from "@components/navbar";
import Head from "next/head"
import GameOverview from "@components/gameOverview";
import SearchBar from "@components/searchBar";
import { useEffect, useState } from "react";
import { Game } from "@types";
import gameService from "@services/GameService";

import GameDescriptionPupUp from "@components/GameDescriptionPupUp";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: React.FC = () => { 

    const { t } = useTranslation();
    
    const [Games, setGames] = useState<Array<Game>>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isPupUpVisible, setPupUpIsVisible] = useState(false);
    const [filteredGames, setFilteredGames] = useState<Array<Game>>([]); // New state to store filtered games
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchgames = async () => {
        if (!sessionStorage.getItem("loggedInUser")){
            setErrorMessage("You are unauthorized. Please log in first.");
        }
        else{
            const allGames: Game[] = await gameService.getAllGames();
            setGames(allGames);
            setFilteredGames(allGames);
        }
    }
    


    const handleCardClick = (game: Game) => { 
        setSelectedGame(game);
        setPupUpIsVisible(true);
    }

    useEffect(() => {
        
        fetchgames();
    }, []);

    return (
        <>
        <Head>
        <title>{t('pages.Home')}</title>
        <meta name="description" content="Courses app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <NavBar></NavBar>
        </header>
        <SearchBar Allgames={Games} setFilteredGames={setFilteredGames} />
        <GameOverview games={filteredGames}/>
        {errorMessage && <div>
            <p className="errorMessageIndex">{errorMessage}
            </p>
            </div>
            }
     
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