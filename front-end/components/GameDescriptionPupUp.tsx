import GameService from "@services/GameService";
import { Game } from "@types";
import error from "next/error";
import { useEffect, useState } from "react";
import styles from "../styles/GameOverview.module.css"; // Import styles

type Props = { 
    selectedGame: Game;
    onClose: () => void;
}

const GameDescriptionPopup: React.FC<Props> = ({ selectedGame, onClose }) => { 
    const [game, setGame] = useState<Game | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [error, setError] = useState<string | null>(null);

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
                        <button className={styles.buyButton}>Buy</button>
                        {/* Add more fields here */}
                    </>
                )}
            </div>
        </div>
    );
};


export default GameDescriptionPopup;