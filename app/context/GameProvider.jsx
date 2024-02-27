import {createContext, useState, useContext, useEffect} from 'react';

const GameContext = createContext();

export const GameProvider = ({albums, children}) => {
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [userGuesses, setUserGuesses] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const selectRandomAlbum = () => {
        const randomindex = Math.floor(Math.random() * albums.length);
        setCurrentAlbum(albums[randomindex]);
    };

    const handleGuess = (guess) => {
        setUserGuesses((prevGuesses) => prevGuesses + 1)
        if(guess === currentAlbum.name){
            setIsCorrect(true);
            setRoundsPlayed((prevRounds) => prevRounds + 1);
        }else{
            setIsCorrect(false);
        }
    }

    const nextRound = () => {
        setIsCorrect(false);
        selectRandomAlbum();
    }

    useEffect(() => {
        selectRandomAlbum();
    }, [])

    return (
        <GameContext.Provider
            value={{
                currentAlbum,
                userGuesses,
                roundsPlayed,
                isCorrect,
                handleGuess,
                nextRound,
            }}
        >
            {children}
        </GameContext.Provider>
    )


}

// Custom hook to use the game context
export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
      throw new Error('useGame must be used within a GameProvider');
    }
    return context;
  };