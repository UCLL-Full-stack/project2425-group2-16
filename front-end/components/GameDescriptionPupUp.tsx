import GameService from "@services/GameService";
import { Game } from "@types";
import error from "next/error";
import { useEffect, useState } from "react";

type Props = { 
    card: HTMLElement;
}

const GameDescriptionPopup: React.FC<Props> = ({ card }) => { 
    const [game, setGame] = useState<Game | null>(null); 

    const fetchMoreInfo = async () => { 
        const title = card.querySelector("h3")?.textContent;
        if (title) {
           const gameData = await GameService.findGameByTitle(title); 
           setGame(gameData);
        }
        else {
            console.log("jizn varam")
        }
    }

    useEffect(() => {
        fetchMoreInfo(); // Call the function
    }, []);

    return (
        <>
            {game && (
                <>
                    <div>{game.title}</div>
                    <div>{game.systemRequirements}</div>
                </>
            )}
        </>
    );
};

export default GameDescriptionPopup;