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
        const username = sessionStorage.getItem("username");
        // ListService.findByUsername()
        if (username) {
            ListService.fetchByUser(username);
        } else {
            console.log("please log in if first if you want to add a game into the favorites")
        }

        //    1. try to retrieve favoriteslist
    //    2. if it is not there then create one with specified game in it
    //    3. 
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

                        </div>

                    </>
                )}
            </div>
        </div>
    );
};


export default GameDescriptionPopup;