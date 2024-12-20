import React, { useState, useEffect } from 'react';
import { Game } from '@types';
import styles from '../styles/GameOverview.module.css';

import GameDescriptionPupUp from "@components/GameDescriptionPupUp";
import userService from '@services/UserService';
import gameService from '@services/GameService';
import ListService from '@services/ListService';

type Props = { 
    games: Array<Game>;
}

const gameOverview: React.FC<Props> = ({ games }) => {
    const [chosenGame, setChosenGame] = useState<Game | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [moderator, setModerator] = useState<boolean>(false);
    const [purchasedStatus, setPurchasedStatus] = useState<boolean>(false);
    const [favoritedStatus, setFavoritedStatus] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [purchasedGames, setPurchasedGames] = useState<any[]>([]); 
    const [favoritedGames, setFavoritedGames] = useState<any[]>([]); 

    useEffect(() => {
        const fetchUserGames = async () => {
            const userFromSession = sessionStorage.getItem("loggedInUser");
            const username = userFromSession ? JSON.parse(userFromSession).username : null;

            if (username) {
                setIsLoading(true); 
                try {
                    const fetchedPurchased = await gameService.findPurchasedByUser(username);
                    setPurchasedGames(fetchedPurchased || []);
                    const fetchedFavorites = await ListService.fetchByUser(username);

                    setFavoritedGames(Array.isArray(fetchedFavorites) ? fetchedFavorites : []);
                } catch (error) {
                    console.error("Failed to fetch purchased or favorited games:", error);
                } finally {
                    setIsLoading(false); 
                }
            }
        };

        fetchUserGames();
    }, [favoritedStatus]); 

    const sessionStorageRoleDealer = async () => { 
        const user = sessionStorage.getItem("loggedInUser");
        const role = user ? JSON.parse(user).role : null;
        if (role === 'standard') {
            return false;
        } else if (role === 'moderator') { 
            return true;
        } else if (role === 'publisher') {
            return false;
        }
        throw new Error("something went wrong while fetching role");
    };

    const handleCardClick = async (game: Game) => { 
        console.log(JSON.stringify(purchasedGames, null, 2));
        const roleStatus = await sessionStorageRoleDealer();

        const purchased = purchasedGames.some(purchasedGame => purchasedGame.id === game.id);
        const favorited = favoritedGames.some(favoritedGame => favoritedGame.id === game.id);

        setModerator(roleStatus);
        setPurchasedStatus(purchased);
        setFavoritedStatus(favorited);
        setChosenGame(game);
        setPopupVisible(true); 
    };

    const closePopup = () => {
        setPopupVisible(false); 
        setChosenGame(null);  
    };

    return (
        <>
        <div className={styles['game-list']}>
            <div className={styles['grid-container']}>
                {games.map((game) => (
                    <div key={game.title} className={styles['game-card']} onClick={() => handleCardClick(game)}>
                        <h3 className={styles['game-title']}>{game.title}</h3>
                        <p className={styles['game-info']}>Genre: {game.genre}</p>
                        <p className={styles['game-info']}>Rating: {game.rating}</p>
                        <p className={styles['game-price']}>Price: ${game.price}</p>
                        <p className={styles['game-info']}>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
                        {/* Display purchase status */}
                        {purchasedGames.some(purchasedGame => purchasedGame.id === game.id) && (
                            <p className={styles['purchase-status']}>You have already purchased this game</p>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {isPopupVisible && chosenGame && !isLoading && (
            <GameDescriptionPupUp 
                selectedGame={chosenGame} 
                onClose={closePopup} 
                moderatorStatus={moderator} 
                purchasedStatus={purchasedStatus} 
                favoritedStatus={favoritedStatus}
            />
        )}
        </>
    );
};

export default gameOverview;
