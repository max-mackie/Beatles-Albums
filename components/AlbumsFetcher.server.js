import axios from 'axios';

export async function fetchAlbums() {
  try {
    const response = await axios.get('https://frontend-interview.evidentinsights.com/');
    return response.data.albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
}