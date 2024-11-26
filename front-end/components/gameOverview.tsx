import React, { useEffect, useState } from 'react';
import gameService from '@services/GameService';
import { Game } from '@types';
import styles from '../styles/GameOverview.module.css'

import GameDescriptionPupUp from "@components/GameDescriptionPupUp";

type Props = { 
    games: Array<Game>;
}

const gameOverview: React.FC<Props> = ({ games } ) => {

    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    const [ChosenCard, setChosenCard] = useState<HTMLElement | null>(null);


    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => { 
        const clickedDIV = event.currentTarget;
        setChosenCard(clickedDIV);
    }

    // if (loading) {
    //     return <div>Loading games...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <>
        <div className={styles['game-list']}>
            <h2 className={styles['game-list-title']}>Games</h2>
            <div className={styles['grid-container']}>
                {games.map((game) => (
                    <div key={game.title} className={styles['game-card']} onClick={handleCardClick}>
                        <h3 className={styles['game-title']}>{game.title}</h3>
                        <p className={styles['game-info']}>Genre: {game.genre}</p>
                        <p className={styles['game-info']}>Rating: {game.rating}</p>
                        <p className={styles['game-price']}>Price: ${game.price}</p>
                        <p className={styles['game-info']}>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
        {ChosenCard && (
        <GameDescriptionPupUp card={ChosenCard} />
        )}
        </>
    );
};

export default gameOverview;
