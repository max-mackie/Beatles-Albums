import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ImageCard from '../ImageCard';
import { GameProvider } from '../../app/context/GameProvider';

// Mocks the Next.js Image component to simplify testing by rendering a regular img tag instead.
// This approach bypasses Next.js's Image optimization for a controlled test environment.
jest.mock('next/image', () => ({ src, alt, width, height }) => (
  <img src={src} alt={alt} width={width} height={height} />
));

// Mocks axios to control responses for HTTP requests within the tests,
// allowing us to simulate various server responses.
jest.mock('axios');

// Mock album data to simulate the context provider's expected input.
const mockAlbum = {
  name: 'Abbey Road',
  cover_image_id: '123',
  year_released: '1961'
};

// Mock response object to simulate an axios response with a blob representing the album cover image.
const mockResponse = {
  data: new Blob(['test image data'], { type: 'image/jpeg' }),
};

// Setup phase: Mock global functions and objects before all tests run.
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "http://mocked.url/blob");
});

// Cleanup phase: Clear all mocks after each test to ensure a clean slate for the next test.
afterEach(() => {
  jest.clearAllMocks();
});

// Teardown phase: Restore any mocked global functions or objects after all tests have run.
afterAll(() => {
  global.URL.createObjectURL.mockRestore();
});

// Describes a group of tests for the ImageCard component.
describe('ImageCard', () => {
  // Test case: Ensures the component renders without throwing errors or crashing.
  it('renders without crashing', () => {
    const { container } = render(
      <GameProvider albums={[mockAlbum]}>
        <ImageCard />
      </GameProvider>
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  // Test case: Verifies that the album cover image is displayed once data has been successfully fetched.
  it('displays the album cover when data has been fetched', async () => {
    axios.get.mockResolvedValue(mockResponse);
    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', "http://mocked.url/blob");
  });

  // Test case: Checks the component's behavior when an error occurs during the album cover fetch operation.
  it('displays nothing when there is an error fetching the album cover', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  // Test case: Confirms that a loading indicator is shown while the album cover image is being fetched.
  it('shows a loading indicator while fetching the album cover', async () => {
    axios.get.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockResponse), 1000);
      });
    });

    render(<GameProvider albums={[mockAlbum]}><ImageCard /></GameProvider>);

    const loadingIndicator = await screen.findByAltText('Loading...');
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveAttribute('src', '/assets/icons/loader.svg');
    expect(loadingIndicator).toHaveAttribute('width', '50');
    expect(loadingIndicator).toHaveAttribute('height', '50');
  });
});
