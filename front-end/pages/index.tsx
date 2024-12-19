import NavBar from "@components/navbar";
import Head from "next/head"
import GameOverview from "@components/gameOverview";
import SearchBar from "@components/searchBar";
import { useEffect, useState } from "react";
import { Game, User } from "@types";
import gameService from "@services/GameService";
import React from "react";
import GameDescriptionPupUp from "@components/GameDescriptionPupUp";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import userService from "@services/UserService";

const Home: React.FC = () => { 

    const { t } = useTranslation();
    
    const [Games, setGames] = useState<Array<Game>>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isPupUpVisible, setPupUpIsVisible] = useState(false);
    const [filteredGames, setFilteredGames] = useState<Array<Game>>([]); // New state to store filtered games
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [table, setTable] = useState<boolean>(false);

    const fetchgames = async () => {
        if (!sessionStorage.getItem("loggedInUser")){
            setErrorMessage("You are unauthorized to view the list of games. Please log in first.");
        }
        else{
            const allGames: Game[] = await gameService.getAllGames();
            setGames(allGames);
            setFilteredGames(allGames);
        }
    }

    
    useEffect(() => {
        
        fetchgames();
    }, []);


    const handleCardClick = (game: Game) => { 
        setSelectedGame(game);
        setPupUpIsVisible(true);
    }

    const toggleTable = () => {
        setTable(prevTable => !prevTable);
    };


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
        <button className="userTableButton" onClick={toggleTable}>View Users Table</button>
        {table && 
            <><table className="userTable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>gamer123</td>
                            <td>gamer123@example.com</td>
                            <td>password123</td>
                            <td>standard (normal user)</td>
                        </tr>
                        <tr>
                            <td>adventureFan</td>
                            <td>adventureFan@example.com</td>
                            <td>adventure123</td>
                            <td>moderator (admin)</td>
                        </tr>
                        <tr>
                            <td>ubisoftBoss</td>
                            <td>ubisoftShelbik@example.com</td>
                            <td>ubisoftShelbik</td>
                            <td>publisher</td>
                        </tr>


                    </tbody>
                </table><p className={"useralert"}>For the dynamic route part of the project, please log in as administrator (adventureFan) and navigate to "/users/[username]", choosing a username from the table above.</p></>
        }



        <SearchBar Allgames={Games} setFilteredGames={setFilteredGames} />
        <GameOverview games={filteredGames}/>
        {errorMessage && <div>
            <p className="useralert">{errorMessage}
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