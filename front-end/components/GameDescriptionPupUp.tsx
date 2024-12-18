import GameService from "../services/GameService";
import { Game } from "@types";
import { useEffect, useState } from "react";
import styles from "../styles/GameOverview.module.css";
import ListService from "../services/ListService";
import Link from "next/link";
import gameService from "../services/GameService";
import HintContainer from "./hintContainer";
import React from "react";

type Props = { 
    selectedGame: Game;
    moderatorStatus: boolean;
    purchasedStatus: boolean;
    onClose: () => void;
}

const GameDescriptionPopup: React.FC<Props> = ({ selectedGame, onClose, moderatorStatus, purchasedStatus }) => { 
    const [game, setGame] = useState<Game | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [favoritedStatus, setFavoritedStatus] = useState<boolean>(false);
    const [extraPermissions, setExtraPermissions] = useState<Boolean>(moderatorStatus);

    const checkGameInFavorites = async () => {
        try {
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            const username = loggedInUser ? JSON.parse(loggedInUser).username : null;
            
            if (username) {
                const list = await ListService.fetchByUser(username);
                const gameId = Number(selectedGame.id);
                const isGameInFavorites = list.games.some(game => Number(game.id) === gameId);
                
                setFavoritedStatus(isGameInFavorites);
            }
        } catch (error) {
            console.error("Error checking favorites:", error);
        }
    };

    const fetchMoreInfo = async () => { 
        try {
            setLoading(true);
            const title = selectedGame.title;
            if (title) {
                const gameData = await GameService.findGameByTitle(title);
                console.log("Fetched game data:", gameData);
                setGame(gameData);
                
                // Check favorites after fetching game info
                await checkGameInFavorites();
            } else {
                setError("Game title is missing");
            }
        } catch (err) {
            console.error("Error fetching game details:", err);
            setError("Error fetching game details");
        } finally {
            setLoading(false);
        }
    };

    const angryModeratorDeletes = async () => { 
        try { 
            if (!game) { 
                setError("Game data is missing. Cannot proceed with deletion.");
                return;
            }
    
            console.log("Deleting game:", game.title);
            const id = game.id;
            await gameService.deleteGame(Number(id));
            window.location.reload();
        } catch (error) { 
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(errorMessage);
        } 
    };
    
    const handleListAdd = async () => { 
        try {
            const gameId = Number(selectedGame.id);
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            const username = loggedInUser ? JSON.parse(loggedInUser).username : null;
            
            if (favoritedStatus) {
                // Remove from favorites
                await ListService.removeGameFromFavorites(username, gameId);
                setFavoritedStatus(false);
            } else {
                // Add to favorites
                const { message } = await ListService.addGameToFavorites(username, gameId);
                setFavoritedStatus(true);
            }
            // refresh page
            window.location.reload();
        } catch (error) {
            console.log("Error updating favorites:", error);
        }
    };

    useEffect(() => {
        fetchMoreInfo();
    }, [selectedGame]);

    useEffect(() => {
        if (error) {
            // Show the dimming effect by adding the class to body
            document.body.classList.add('hint-active');
        } else {
            // Reset the dimming effect when the error is cleared
            document.body.classList.remove('hint-active');
        }
    }, [error]);  // Only trigger when `error` state changes

    if (loading) return <div>Loading...</div>;
    if (error) return <HintContainer error={new Error(error)} onClose={() => setError(null)} />;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose} aria-label="close"><span className={styles.icon}>×</span></button>
                {game && (
                    <>  
                        {moderatorStatus && <button onClick={angryModeratorDeletes}>Delete</button>}
                        <h2>{game.title}</h2>
                        <p><strong>System Requirements:</strong> {game.systemRequirements}</p>
                        <p><strong>Rating:</strong> {game.rating}</p>
                        <div className={styles.buttonsWrap}>
                            {!purchasedStatus &&
                                <Link href={{
                                    pathname: '/PurchasePage',
                                    query: { game: JSON.stringify(game) }
                                }}>
                                      <button className={styles.buyButton}>Buy</button>
                                </Link>
                            }
                            {purchasedStatus && 
                                <p>Game has already been purchased</p>
                            }
                            <button 
                                className={styles.listButton} 
                                onClick={handleListAdd}
                            >
                                {favoritedStatus ? "Remove from List" : "Add to List"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GameDescriptionPopup;
