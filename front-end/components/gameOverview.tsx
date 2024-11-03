import React, { useEffect, useState } from 'react';
import gameService from '@services/GameService';
import { Game } from '@types';
import styles from '../styles/GameOverview.module.css'

const GameList: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const fetchedGames = await gameService.getAllGames();
                setGames(fetchedGames);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <div>Loading games...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles['game-list']}>
            <h2 className={styles['game-list-title']}>Games</h2>
            <div className={styles['grid-container']}>
                {games.map((game) => (
                    <div className={styles['game-card']}>
                        <h3 className={styles['game-title']}>{game.title}</h3>
                        <p className={styles['game-info']}>Genre: {game.genre}</p>
                        <p className={styles['game-info']}>Rating: {game.rating}</p>
                        <p className={styles['game-price']}>Price: ${game.price}</p>
                        <p className={styles['game-info']}>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameList;
