import React, { useState } from 'react';
import { Game } from '@types';
import styles from '../styles/GameOverview.module.css'

import GameDescriptionPupUp from "@components/GameDescriptionPupUp";

type Props = { 
    games: Array<Game>;
}

const gameOverview: React.FC<Props> = ({ games } ) => {
    const [chosenGame, setChosenGame] = useState<Game | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [moderator, setModerator] = useState<boolean>(false)

    const sessionStorageRoleDealer = async () => { 
        const user = sessionStorage.getItem("loggedInUser");
        const role = user ? JSON.parse(user).role : null;
        if (role == 'standard') {
            // throw new Error("unexpected error" )
            return false
        } else if (role == 'moderator') { 
            return true
        } else { 
            throw new Error("something went wrong while fetching role")
        }
    }


    const handleCardClick = async (game: Game) => { 
        const roleStatus = await sessionStorageRoleDealer()
        setModerator(roleStatus);
        console.log(`Game ${game.title} selected`);
        setChosenGame(game);
        setPopupVisible(true);
    }

    const closePopup = () => {
        setPopupVisible(false); // Close the popup when the close button is clicked
        setChosenGame(null);  // Optionally reset selectedGame if necessary
    };

    // const removeGameFromList = (gameId: number) => {
    //     // Update the gamesUsed state by filtering out the removed game
    //     setGamesUsed(gamesUsed=> gamesUsed.filter(game => Number(game.id) !== gameId));
    // };


    return (
        <>
        <div className={styles['game-list']}>
            {/* <h2 className={styles['game-list-title']}>Games</h2> */}
            <div className={styles['grid-container']}>
                {games.map((game) => (
                    <div key={game.title} className={styles['game-card']} onClick={() => handleCardClick(game)}>
                        <h3 className={styles['game-title']}>{game.title}</h3>
                        <p className={styles['game-info']}>Genre: {game.genre}</p>
                        <p className={styles['game-info']}>Rating: {game.rating}</p>
                        <p className={styles['game-price']}>Price: ${game.price}</p>
                        <p className={styles['game-info']}>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
        {isPopupVisible && chosenGame && (
        <GameDescriptionPupUp selectedGame={chosenGame} onClose={closePopup} moderatorStatus={moderator}/>
        )}
        </>
    );
};

export default gameOverview;
