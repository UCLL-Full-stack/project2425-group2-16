import { Game, User } from "@types";
import styles from '@styles/Profile.module.css';
import { useTranslation } from "next-i18next";
import GameOverview from "./gameOverview";
import gameService from "@services/GameService";
import { useEffect, useState } from "react";
import ListService from "@services/ListService";

type Props = { 
    user: User;
}



const UserOverview: React.FC<Props> = ({ user }) => {
    const [favorites, setFavorites] = useState<Array<Game>>([]);
    // const [purchasedGames, setPurchasedGmas] = useState<Array<Game>>;
    
    const { t } = useTranslation();

    const fetchFavorites = async () => { 
        const user = sessionStorage.getItem("loggedInUser");
    
        if (user == null) { 
            throw new Error("Make sure you are logged in");
        }
    
        // Parse the user string into an object
        const userObj = JSON.parse(user);
        
        // Now you can safely access the username
        const username = userObj.username;
    
        // Fetch favorites by username
        const favorites = await ListService.fetchByUser(username);
        const gamesList = favorites.games;
        setFavorites(gamesList)

    }
    
    
    useEffect(() => {
        
        // fetchgames();
        fetchFavorites();
    }, []);






    return (
        <>
            <div className={styles['profile-cont']}>
                <img 
                    src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-36.jpg" 
                    alt="Profile Picture" 
                    className={styles['profile-img']}
                />
                <div>
                    <h1 className={styles['profile-info']}>{t('info.greet')}, {user.username}!</h1>
                    <p className={styles['profile-info']}>{t('info.email')}: {user.emailAddress}</p>
                    <p className={styles['profile-info']}>{t('info.phone')}: {user.phoneNumber}</p>
                    <p className={styles['profile-info']}>{t('info.country')}: {user.country}</p>
                </div>
            </div>

            <div className="filterButtons">
                <button className="puchasedFilterButton">purchased</button>
                <button className="favoritesFilterButton">favorites</button>
            </div>
            <GameOverview games={favorites}/>
        </>
    );
}

export default UserOverview;
