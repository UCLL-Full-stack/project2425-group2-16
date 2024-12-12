import GameService from "@services/GameService";
import { Game } from "@types";
import error from "next/error";
import { useEffect, useState } from "react";
import styles from "../styles/GameOverview.module.css"; // Import styles
import { it } from "node:test";
import ListService from "@services/ListService"

type Props = { 
    selectedGame: Game;
    onClose: () => void;
}

const GameDescriptionPopup: React.FC<Props> = ({ selectedGame, onClose }) => { 
    const [game, setGame] = useState<Game | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [error, setError] = useState<string | null>(null);
    const [favoritedStatus, setFavoritedStatus] = useState<boolean>(false)

    const fetchMoreInfo = async () => { 
        try {
            setLoading(true);
            const title = selectedGame.title;
            if (title) {
                const gameData = await GameService.findGameByTitle(title);
                console.log("Fetched game data:", gameData);
                setGame(gameData);
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
    
    const handleLIstAdd = async () => { 
        try {
            const gameId = Number(selectedGame.id);
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            const username = loggedInUser ? JSON.parse(loggedInUser).username : null;
            
            // Call the service and destructure the response
            const { message, updatedFavoritesList } = await ListService.addGameToFavorites(username, gameId);
    
            // Log or handle the response
            console.log("Success message:", message);
            console.log("Updated Favorites List:", updatedFavoritesList);
    
            if (message == "Game successfully added to favorites") {
                setFavoritedStatus(true); // You can use this to track whether the game was successfully added to the favorites

            }
    
        } catch (error) {
            console.log("Error adding game to favorites:", error);
        }
    }
    



    useEffect(() => {
        fetchMoreInfo(); // Call the function
    }, [selectedGame]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}><span className={styles.icon}>×</span></button>
                {game && (
                    <>
                        <h2>{game.title}</h2>
                        <p><strong>System Requirements:</strong> {game.systemRequirements}</p>
                        <p><strong>Rating:</strong> {game.rating}</p>
                        <div className={styles.buttonsWrap}>

                        <button className={styles.buyButton}>Buy </button>
                        <button className={styles.listButton} onClick={handleLIstAdd}>add to a list</button>
                        {favoritedStatus && (
                            <p>game has been sent to gulag</p>
                        )}
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};


export default GameDescriptionPopup;