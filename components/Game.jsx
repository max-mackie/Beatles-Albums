"use client"
import {useState} from 'react';
import {useGame} from '../app/context/GameProvider';
import ImageCard from './ImageCard';

const Game = () => {
    const {albums, albumOptions, currentAlbum, handleGuess, nextRound, isCorrect, userGuesses, roundsPlayed} = useGame();
    const [selectedOption, setSelectedOption] = useState('');

    const submitGuess = () => {
        handleGuess(selectedOption);
        setSelectedOption('')
    }

    const moveToNextRound = () => {
        nextRound(albums)
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const renderOptions = () => {
        const options = currentAlbum ? albumOptions : [];
        return options.map((option, index) => (
            <label key={index}>
                <input
                    type="radio"
                    name="albumOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                />
                {option}
            </label>
        ));
    };

    return (
        <div>
            <h2>Guess the Album</h2>
            <ImageCard/>
            <div>{renderOptions()}</div>
            <button onClick={submitGuess} disabled={!selectedOption}>Submit Guess</button>
            {isCorrect !== null && (
                <div>
                    {isCorrect ? (
                        <div>
                            <p>Correct! The album is {currentAlbum.name}.</p>
                            <button onClick={moveToNextRound}>Next Question</button>
                        </div>
                    ) : (
                        <p>Wrong guess. Try again!</p>
                    )}
                </div>
            )}
            <div>
                <p>User Guesses: {userGuesses}</p>
                <p>Rounds played: {roundsPlayed}</p>
            </div>
        </div>
    );
};

export default Game;