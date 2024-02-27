import axios from 'axios';
import {GameProvider} from './context/GameProvider';
import Game from '../components/Game';

export async function getStaticProps(){
  let albumData = [];
  try {
    const response = await axios.get('https://frontend-interview.evidentinsights.com/');
    albumData = response.data.albums
  } catch (error) {
    console.error('Error fetching albums:', error);
    // Handle error appropriately
  }

  return {
    props: {
      albums: albumData,
    },
    revalidate: 86400, // or any other appropriate time
  };
};

const HomePage = ({ albums }) => {
  return (
    <GameProvider albums={albums}>
      <div>Home page</div>
      <Game/>
    </GameProvider>
  );
};

export default HomePage;
