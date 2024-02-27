import {useState} from 'react';
import {useGame} from '../context/GameProvider';

const Game = () => {
    const {currentAlbum, handleGuess, nextRound, isCorrect, userGuesses, roundsPlayed} = useGame();
    const [selectedOption, setSelectedOption] = useState('');

    const submitGuess = () => {
        handleGuess(selectedOption);
        setSelectedOption('')
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const renderOptions = () => {
        const options = currentAlbum ? ['Option 1', 'Option 2', currentAlbum.name] : [];
        return options.map((option, index) => {
            <label key={index}> //check if this is best practice
                <input
                    type="radio"
                    name="albumOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                />
                {option}
            </label>
        });
    };

    return (
        <div>
            <h2>Guess the Album</h2>
            {currentAlbum && <img src={currentAlbum.coverImageUrl} alt='Album cover' />}
            <div>{renderOptions()}</div>
            <button onClick={submitGuess} disabled={!selectedOption}>Submit Guess</button>
            {isCorrect !== null && (
                <div>
                    {isCorrect ? <p>Correct! The album is {currentAlbum.name}.</p> : <p>Wrong guess. Try again!</p>}
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