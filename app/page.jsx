import { fetchAlbums } from '../components/AlbumsFetcher.server';
import { GameProvider } from './context/GameProvider';
import Game from '../components/Game';
import {Suspense} from 'react'

function AlbumsContainer() {
  const albums = fetchAlbums(); // This needs to be adjusted to work with Suspense, usually via a hook or a library
  return (
    <GameProvider albums={albums}>
      <Game />
    </GameProvider>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AlbumsContainer />
    </Suspense>
  );
}