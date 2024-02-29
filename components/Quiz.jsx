"use client";
import React, { useState } from 'react';
import { useGame } from '../app/context/GameProvider';
import ImageCard from './ImageCard';
import Image from 'next/image';


/**
 * The Quiz component manages the quiz gameplay, allowing users to guess the current album
 * based on the album cover shown. It displays album options, provides feedback on guesses,
 * and advances to the next round upon a correct guess.
 */
const Quiz = () => {
    const {
        albums,
        albumOptions,
        currentAlbum,
        handleGuess,
        nextRound,
        isCorrect,
        userGuesses,
        roundsPlayed,
        isLoading
    } = useGame();

    const [selectedOption, setSelectedOption] = useState('');

    /**
     * Handles the submission of a guess, invoking the context's guess handler
     * and setting the selected option.
     * @param {string} option The guessed album name.
     */
    const submitGuess = (option) => {
        handleGuess(option);
        setSelectedOption(option);
    };

    /**
     * Triggers the next round of the quiz by resetting the selected option
     * and invoking the context's next round function.
     */
    const moveToNextRound = () => {
        setSelectedOption('');
        nextRound(albums);
    };

    /**
     * Renders the album options as clickable elements, allowing the user to make a guess.
     * Options are disabled after a guess has been made, awaiting the next round.
     */
    const renderOptions = () => {
        return albumOptions.map((option, index) => (
            <div 
                key={index}
                className={`${selectedOption === option ? 'selected_option_btn' : 'option_btn'} ${!isCorrect ? 'hover:bg-black hover:text-white cursor-pointer' : ''}`}
                onClick={!isCorrect ? () => submitGuess(option) : undefined}  
                aria-disabled={selectedOption !== ''} // Improved accessibility
            >
                {option}
            </div>
        ));
    };
    if (isLoading) {
        return (
            <section className="flex justify-center items-center h-full">
                <Image
                    src="/assets/icons/loader.svg"
                    alt="Loading..."
                    width={50}
                    height={50}
                />
            </section>
        )
    }

    return (
        <div className='w-full max-2-2xl flex items-center flex-col gap-7 glassmorphism'>
            <h1 className='head_text text-xl sm:text-3xl'>Name That Beatles Album!</h1>
            <ImageCard/>
            <div className='flex-col flex-start block gap-1'>
                {renderOptions()}
            </div>
            {isCorrect !== null && (
                <div>
                    {isCorrect ? (
                        <div className='flex-col flex-center'>
                            <p>Correct!</p>
                            <p className='pb-2'>The album &quot;{currentAlbum.name}&quot; was released in {currentAlbum.year_released}</p>
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
                <p className='inline'>Total Guesses: {userGuesses}</p>
                <p className='inline'>Rounds played: {roundsPlayed}</p>
            </div>
        </div>
    );
};

export default Quiz;
