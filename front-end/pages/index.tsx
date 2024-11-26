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
    const [Cards, setCards] = useState<Array<HTMLElement>>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isPupUpVisible, setPupUpIsVisible] = useState(false);
    
    const fetchgames = async () => { 
        const allGames = await gameService.getAllGames();
        setGames(allGames);
    }
    
    const cardDealer = () => { 
        const cards = Array.from(document.querySelectorAll('[class*="game-card"]')) as HTMLElement[];
        setCards(cards)
    };

    const fetchData = async () => {
        await fetchgames();
        cardDealer();
    };

    const handleCardClick = (game: Game) => { 
        setSelectedGame(game);
        setPupUpIsVisible(true);
    }

    useEffect(() => {
        
        fetchData();
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
        <SearchBar Allgames={Games} cards={Cards} />
        {/* {isPupUpVisible && selectedGame && (
                <GameDescriptionPupUp selectedGame={selectedGame}/>
            )} */}
        <GameOverview games={Games}/>
     
        </>
    );
};

export default Home;