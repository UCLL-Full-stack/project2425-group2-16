import { Game } from '@types';
import React, { useState } from 'react';
import style from "../styles/SearchBar.module.css";

type Props = {
    Allgames: Array<Game>; // Specify the type more accurately if possible
    setFilteredGames: React.Dispatch<React.SetStateAction<Array<Game>>>;
};

const SearchBar: React.FC<Props> = ({ Allgames, setFilteredGames }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setSearchTerm(input);
        console.log(input);

        const filtered = Allgames.filter((game) =>
            game.title.toLowerCase().includes(input)
        );
        setFilteredGames(filtered);

    };

    return (
        <>
        <div className={style.container}>
        <input className={style.searchInput}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
        />
        </div>
    </>
    );
};

export default SearchBar;