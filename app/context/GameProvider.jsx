"use client"; 
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const GAME_STATE_KEY = 'beatlesGameState'; 

const GameContext = createContext();

export const GameProvider = ({ children, albums }) => {
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [userGuesses, setUserGuesses] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [albumOptions, setAlbumOptions] = useState([]);

    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const selectRandomAlbum = useCallback((albums) => {
        const randomIndex = Math.floor(Math.random() * albums.length);
        const selectedAlbum = albums[randomIndex];
        setCurrentAlbum(selectedAlbum);
    
        // Select two random albums different from the current one
        let randomAlbums = albums.filter(a => a.name !== selectedAlbum.name);
        shuffleArray(randomAlbums);
        randomAlbums = randomAlbums.slice(0, 2);
    
        // Combine and shuffle the options
        const options = [selectedAlbum, ...randomAlbums].map(a => a.name);
        shuffleArray(options);
        console.log(options);
        setAlbumOptions(options); // Set the shuffled options
    }, [])
    
    const handleGuess = (guess) => {
        setUserGuesses((prevGuesses) => prevGuesses + 1)
        if(guess === currentAlbum.name){
            setIsCorrect(true);
            setRoundsPlayed((prevRounds) => prevRounds + 1);
        } else {
            setIsCorrect(false);
        }
    }

    const nextRound = (albums) => {
        setIsCorrect(null);
        selectRandomAlbum(albums);
    }

    // Load initial game state from session storage
    useEffect(() => {
        const loadGameState = async () => {
            const storedState = sessionStorage.getItem(GAME_STATE_KEY);
            if (storedState) {
                const parsedState = JSON.parse(storedState);
                console.log(parsedState)
                if (parsedState.currentAlbum && parsedState.currentAlbum.cover_image_id) { // Check if currentAlbum and cover_image_id exist
                    setCurrentAlbum(parsedState.currentAlbum);
                    setUserGuesses(parsedState.userGuesses);
                    setRoundsPlayed(parsedState.roundsPlayed);
                    setAlbumOptions(parsedState.albumOptions)
                } else {
                    if (albums && albums.length > 0) {
                    selectRandomAlbum(albums);
                    }
                }
            }
            // setIsInitialStateLoaded(true);
        };
        loadGameState();
    }, [albums, selectRandomAlbum]);


    // Save game state to sessionStorage
    useEffect(() => {
        const updatedState = { currentAlbum, userGuesses, roundsPlayed, albumOptions}
        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(updatedState));
    }, [currentAlbum, userGuesses, roundsPlayed, albumOptions]); 


    return (
        <GameContext.Provider
            value={{
                albums,
                currentAlbum,
                userGuesses,
                roundsPlayed,
                isCorrect,
                handleGuess,
                nextRound,
                albumOptions,
            }}
        >
            {children} 
        </GameContext.Provider>
    );
};

// Custom hook to use the game context
export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};


