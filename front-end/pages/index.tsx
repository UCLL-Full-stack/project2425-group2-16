import NavBar from "@components/navbar";
import Head from "next/head"
import GameOverview from "@components/gameOverview";
import SearchBar from "@components/searchBar";
import { useEffect, useState } from "react";
import { Game } from "@types";
import gameService from "@services/GameService";

import GameDescriptionPupUp from "@components/GameDescriptionPupUp";

const Home: React.FC = () => { 
    
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
        <title>Home page</title>
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

export default Home;