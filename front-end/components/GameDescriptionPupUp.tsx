import GameService from "@services/GameService";
import { Game } from "@types";
import { useEffect, useState } from "react";
import styles from "../styles/GameOverview.module.css";
import ListService from "@services/ListService"

type Props = { 
    selectedGame: Game;
    moderatorStatus: boolean;
    onClose: () => void;
}

const GameDescriptionPopup: React.FC<Props> = ({ selectedGame, onClose, moderatorStatus }) => { 
    const [game, setGame] = useState<Game | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [favoritedStatus, setFavoritedStatus] = useState<boolean>(false)
    const [extraPermissions, setExtraPermissions] = useState<Boolean>(moderatorStatus)
    // const [subPopUp, enableSubPopUp] = useState<boolean>(false);

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
    }
    const deleteGame = () =>  {
        
    }

    useEffect(() => {
        fetchMoreInfo();
    }, [selectedGame]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}><span className={styles.icon}>×</span></button>
                {game && (
                    <>  {!moderatorStatus && ( 
                        <button onClick={deleteGame}>delete </button>

                    )}
                        <h2>{game.title}</h2>
                        <p><strong>System Requirements:</strong> {game.systemRequirements}</p>
                        <p><strong>Rating:</strong> {game.rating}</p>
                        <div className={styles.buttonsWrap}>
                            <button className={styles.buyButton}>Buy</button>   
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