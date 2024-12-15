import { Game, User } from "@types";
import styles from "@styles/Profile.module.css";
import { useTranslation } from "next-i18next";
import GameOverview from "./gameOverview";
import gameService from "@services/GameService";
import { useEffect, useState } from "react";
import ListService from "@services/ListService";
import userService from "@services/UserService";

type Props = {
  user: User;
};

const UserOverview: React.FC<Props> = ({ user }) => {
  const [favorites, setFavorites] = useState<Array<Game>>([]);
  const [purchased, setPurchased] = useState<Array<Game>>([]);
  const [favMessage, setFavMessage] = useState<string | null>(null);
  const [purMessage, setPurMessage] = useState<string | null>(null);
  const [favChosen, setFavChosen] = useState<boolean>(true);
  const [purChosen, setPurChosen] = useState<boolean>(false);

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
    try {
      const favorites = await ListService.fetchByUser(username);
      const gamesList = favorites.games;
      setFavorites(gamesList);
    } catch (error) {
      setFavMessage("No favorite games found!");
    }
  };

  const fetchPurchasedGames = async () => {
    const fullUser = await userService.fetchUser();
    const purGames = fullUser.purchasedGames;
    console.log("purchased games:" + purGames);
    purGames.length == 0 ? setPurMessage("No purchased games found") : null;
    setPurchased(purGames);
  };

  const chooseFav = () => {
    setFavChosen(true);
    setPurChosen(false);
  };

  const choosePur = () => {
    setFavChosen(false);
    setPurChosen(true);
  };

  useEffect(() => {
    setFavMessage("");
    setPurMessage("");

    // fetchgames();
    fetchFavorites();
    fetchPurchasedGames();
  }, []);

  return (
    <>
      <div className={styles["profile-cont"]}>
        <img
          src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-36.jpg"
          alt="Profile Picture"
          className={styles["profile-img"]}
        />
        <div>
          <h1 className={styles["profile-info"]}>
            {t("info.greet")}, {user.username}!
          </h1>
          <p className={styles["profile-info"]}>
            {t("info.email")}: {user.emailAddress}
          </p>
          <p className={styles["profile-info"]}>
            {t("info.phone")}: {user.phoneNumber}
          </p>
          <p className={styles["profile-info"]}>
            {t("info.country")}: {user.country}
          </p>
        </div>
      </div>

      <div className="filterButtons">
        <button className="purchasedFilterButton" onClick={choosePur}>purchased</button>
        <button className="favoritesFilterButton" onClick={chooseFav}>favorites</button>
      </div>
      {favChosen && (
        <>
          <GameOverview games={favorites} />
          {favMessage && <p>{favMessage}</p>}
        </>
      )}
      {purChosen && (
        <>
          <GameOverview games={purchased} />
          {purMessage && <p>{purMessage}</p>}
        </>
      )}

      
    </>
  );
};

export default UserOverview;
