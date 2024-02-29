import React from 'react';
import { GameProvider } from '../context/GameProvider';
import Quiz from '../../components/Quiz';
import axios from 'axios';

export default async function HomePage() {
  try {
    const response = await axios.get('https://frontend-interview.evidentinsights.com/');
    const albums = response.data.albums.filter(album => album.cover_image_id !== 10);; //api returns blank image for this album cover
    return (
      <GameProvider albums={albums}> 
        <Quiz /> 
      </GameProvider>
    );
  } catch (error) {
    console.error('Error fetching albums:', error);
    return (
      <div>Failed to load albums. Please try again later.</div> 
    );
  }
}