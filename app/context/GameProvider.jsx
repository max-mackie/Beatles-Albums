"use client";
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const GAME_STATE_KEY = 'beatlesGameState';
const GameContext = createContext();

/**
 * Provides context for managing the state of the game, including the current album,
 * user guesses, and rounds played. It also manages the selection of album options for
 * the game and persists the game state in session storage.
 */
export const GameProvider = ({ children, albums }) => {
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [userGuesses, setUserGuesses] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [albumOptions, setAlbumOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Shuffles the given array in-place and returns nothing
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Selects a random album and prepares album options for the quiz
    const selectRandomAlbum = useCallback((albums) => {
        if (!albums || !albums.length) return; // Guard clause for empty or undefined albums array

        const randomIndex = Math.floor(Math.random() * albums.length);
        const selectedAlbum = albums[randomIndex];
        setCurrentAlbum(selectedAlbum);

        let randomAlbums = albums.filter(a => a.name !== selectedAlbum.name);
        shuffleArray(randomAlbums);
        randomAlbums = randomAlbums.slice(0, 2);

        const options = [selectedAlbum, ...randomAlbums].map(a => a.name);
        shuffleArray(options);
        setAlbumOptions(options);
    }, []);

    // Handles user's guess and updates game state accordingly
    const handleGuess = (guess) => {
        setUserGuesses(prevGuesses => prevGuesses + 1);
        setIsCorrect(guess === currentAlbum.name);
        if (guess === currentAlbum.name) {
            setRoundsPlayed(prevRounds => prevRounds + 1);
        }
    };

    // Prepares the next round of the game
    const nextRound = useCallback(() => {
        setIsCorrect(null);
        selectRandomAlbum(albums);
    }, [albums, selectRandomAlbum]);

    // Load game state from session storage
    useEffect(() => {
        const loadGameState = () => {
            setIsLoading(true);
            const storedState = sessionStorage.getItem(GAME_STATE_KEY);
            if (storedState) {
                try {
                    const parsedState = JSON.parse(storedState);
                    setCurrentAlbum(parsedState.currentAlbum);
                    setUserGuesses(parsedState.userGuesses);
                    setRoundsPlayed(parsedState.roundsPlayed);
                    setAlbumOptions(parsedState.albumOptions);
                } catch (error) {
                    console.error('Error loading game state:', error);
                    // Reset game state to initial values
                    setCurrentAlbum(null);
                    setUserGuesses(0);
                    setRoundsPlayed(0);
                    setIsCorrect(null);
                    setAlbumOptions([]);
                    if (albums && albums.length > 0) {
                        selectRandomAlbum(albums);
                    }
                }
            } else {
                selectRandomAlbum(albums); // Initialize game with random album if no stored state
            }
            setIsLoading(false);
        };
        loadGameState();
    }, [albums, selectRandomAlbum]);

    // Save game state to session storage
    useEffect(() => {
        const gameState = { currentAlbum, userGuesses, roundsPlayed, albumOptions };
        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    }, [currentAlbum, userGuesses, roundsPlayed, albumOptions]);

    return (
        <GameContext.Provider value={{
            albums,
            currentAlbum,
            userGuesses,
            roundsPlayed,
            isCorrect,
            handleGuess,
            nextRound,
            albumOptions,
            isLoading
        }}>
            {children}
        </GameContext.Provider>
    );
};

/**
 * Custom hook for consuming game context.
 * Throws an error if used outside of GameProvider to ensure proper usage.
 */
export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
