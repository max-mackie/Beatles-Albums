import { GameProvider } from './context/GameProvider';
import Game from '../components/Game';
import axios from 'axios';

export default async function HomePage() {
  try {
    const response = await axios.get('https://frontend-interview.evidentinsights.com/');
    const albums = response.data.albums;
    return (
      <GameProvider albums={albums}> 
        <Game /> 
      </GameProvider>
    );
  } catch (error) {
    console.error('Error fetching albums:', error);
    return (
      <div>Failed to load albums. Please try again later.</div> 
    );
  }
}