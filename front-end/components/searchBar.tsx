import { Game } from '@types';
import React, { useState } from 'react';

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
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
        />
    </>
    );
};

export default SearchBar;