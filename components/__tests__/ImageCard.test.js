import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ImageCard from '../ImageCard';
import { GameProvider } from '../../app/context/GameProvider';

// Mock Next.js Image component as a regular img tag
jest.mock('next/image', () => ({ src, alt, width, height }) => (
  <img src={src} alt={alt} width={width} height={height} />
));

jest.mock('axios');

const mockAlbum = {
  name: 'Abbey Road',
  cover_image_id: '123',
  year_released: '1961'
};

const mockResponse = {
  data: new Blob(['test image data'], { type: 'image/jpeg' }),
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://mocked.url/blob");
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  global.URL.createObjectURL.mockRestore();
});

describe('ImageCard', () => {
    it('renders without crashing', () => {
        const { container } = render(
          <GameProvider albums={[mockAlbum]}>
            <ImageCard />
          </GameProvider>
        );
        const section = container.querySelector('section');
        expect(section).toBeInTheDocument();
      });

  it('displays the album cover when data has been fetched', async () => {
    axios.get.mockResolvedValue(mockResponse);
    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', "http://mocked.url/blob");
  });
  
  it('displays nothing when there is an error fetching the album cover', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows loading text while fetching the album cover', async () => {
    axios.get.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockResponse), 1000);
      });
    });
    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);
    const loadingText = await screen.findByText('Loading album cover...');
    expect(loadingText).toBeInTheDocument();
  });

});
