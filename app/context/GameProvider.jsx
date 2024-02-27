import {createContext, useState, useContext, useEffect} from 'react';

const GameContext = createContext();

export const GameProvider = ({albums, children}) => {
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [userGuesses, setUserGuesses] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const fetchAlbumCover = async (albumId) => {
        try {
            const response = await axios.get(`https://frontend-interview.evidentinsights.com/album_covers/${albumId}/`);
            return response.data.coverImageUrl; // Assuming this is the correct response structure
        } catch (error) {
            console.error('Error fetching album cover:', error);
            return ''; // Return a fallback or default image URL
        }
    };

    const selectRandomAlbum = async () => {
        const randomIndex = Math.floor(Math.random() * albums.length);
        const selectedAlbum = albums[randomIndex];
        const coverImageUrl = await fetchAlbumCover(selectedAlbum.id); // Fetch and wait for cover image URL
        setCurrentAlbum({ ...selectedAlbum, coverImageUrl }); // Combine album info with cover URL
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