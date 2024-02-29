"use client"
import {useState} from 'react';
import {useGame} from '../app/context/GameProvider';
import ImageCard from './ImageCard';

const Quiz = () => {
    const {albums, albumOptions, currentAlbum, handleGuess, nextRound, isCorrect, userGuesses, roundsPlayed} = useGame();
    const [selectedOption, setSelectedOption] = useState('');

    const submitGuess = (option) => {
        handleGuess(option);
        setSelectedOption(option)
    }

    const moveToNextRound = () => {
        setSelectedOption('')
        nextRound(albums)
    }

    const renderOptions = () => {
        const options = currentAlbum ? albumOptions : [];
        return options.map((option, index) => (
            <div 
                key={index}
                className={`${selectedOption === option ? 'selected_option_btn' : 'option_btn'} ${!isCorrect ? 'hover:bg-black hover:text-white cursor-pointer' : ''}`}
                onClick={!isCorrect ? () => submitGuess(option) : () => {}}  
                disabled={selectedOption !== ''}          
            >
                {option}
            </div>
        ));
    };

    return (
        <div className=' w-full max-2-2xl flex items-center flex-col gap-7 glassmorphism'>
        
            <ImageCard/>
            <div className='flex-col flex-start block gap-1'>
                {renderOptions()}
            </div>
            {isCorrect !== null && (
                <div>
                    {isCorrect ? (
                        <div className='flex flex-col flex-center'>
                            <p>Correct!</p>
                            <p className='pb-2'>The album "{currentAlbum.name}" was released in {currentAlbum.year_released}</p>
                            <button 
                                onClick={moveToNextRound} 
                                className='px-5 py-1.5 rounded text-sm bg-primary-orange rounded-full text-white'
                            >
                                Next Question
                            </button>
                        </div>
                    ) : (
                        <p>Wrong guess. Try again!</p>
                    )}
                </div>
            )}
            <div className='flex flex-row gap-5'>
                <p className='inline'>User Guesses: {userGuesses}</p>
                <p className='inline'>Rounds played: {roundsPlayed}</p>
            </div>

        </div>
    );
};

export default Quiz;