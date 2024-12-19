import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/searchBar';
import { Game } from '@types';

// Mock the CSS module import
jest.mock('../styles/SearchBar.module.css', () => ({}));


describe('SearchBar Component', () => {
    const mockGames: Array<Game> = [
        {
            id: 1, title: 'The Legend of Zelda',
            genre: '',
            rating: 0,
            supportedLanguages: '',
            price: 0,
            systemRequirements: '',
            releaseDate: new Date('1986-02-21'),
            multiplayer: false
        },
        {
            id: 2, title: 'Super Mario Odyssey',
            genre: '',
            rating: 0,
            supportedLanguages: '',
            price: 0,
            systemRequirements: '',
            releaseDate: new Date('1986-02-21'),
            multiplayer: false
        },
        {
            id: 3, title: 'Animal Crossing',
            genre: '',
            rating: 0,
            supportedLanguages: '',
            price: 0,
            systemRequirements: '',
            releaseDate: new Date('1986-02-21'),
            multiplayer: false
        },
    ];

    const setFilteredGames = jest.fn();

    test('renders search input', () => {
        render(<SearchBar Allgames={mockGames} setFilteredGames={setFilteredGames} />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('updates search term on input change', () => {
        render(<SearchBar Allgames={mockGames} setFilteredGames={setFilteredGames} />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: 'Zelda' } });
        expect(inputElement).toHaveValue('zelda');
    });

    test('filters games based on search term', () => {
        render(<SearchBar Allgames={mockGames} setFilteredGames={setFilteredGames} />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: 'Mario' } });
        expect(setFilteredGames).toHaveBeenCalledWith([{
            id: 2, title: 'Super Mario Odyssey',
            genre: '',
            rating: 0,
            supportedLanguages: '',
            price: 0,
            systemRequirements: '',
            releaseDate: new Date('1986-02-21'),
            multiplayer: false
        }]);
    });

    test('filters games case insensitively', () => {
        render(<SearchBar Allgames={mockGames} setFilteredGames={setFilteredGames} />);
        const inputElement = screen.getByPlaceholderText(/search/i);
        fireEvent.change(inputElement, { target: { value: 'zelda' } });
        expect(setFilteredGames).toHaveBeenCalledWith([{
            id: 1, title: 'The Legend of Zelda',
            genre: '',
            rating: 0,
            supportedLanguages: '',
            price: 0,
            systemRequirements: '',
            releaseDate: new Date('1986-02-21'),
            multiplayer: false
        }]);
    });
});