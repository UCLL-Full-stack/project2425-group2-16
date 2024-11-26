import React, { useState } from 'react';

type Props = {
    Allgames: Array<any>; // Specify the type more accurately if possible
    cards: Array<HTMLElement>; // Assuming cards are HTML elements
};

const SearchBar: React.FC<Props> = ({ Allgames, cards }) => {
    const [searchTerm, setSearchTerm] = useState('');
    

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setSearchTerm(input);
        console.log(input)

        cards.forEach((card) => {
            console.log('loop is started')
            const titleElement = card.querySelector('h3');
            // console.log(card.querySelector('p')?.textContent);
            if (titleElement) {
                const title = titleElement.textContent?.toLowerCase();
                if (title && title.includes(input)) {
                    card.classList.remove('invisible');
                    // console.log('halli')ij
                } else {
                    card.classList.add('invisible');
                    // console.log('hallo')
                }
            }
            else {
                console.log('i can not see shit ')
            }
        });
    };

    return (
        <>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
            />
            {/* Optionally render matching games here */}
        </>
    );
};

export default SearchBar;