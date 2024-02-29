import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGame } from '../app/context/GameProvider';
import Image from 'next/image';

/**
 * ImageCard component for displaying the album cover.
 * It fetches the album cover image asynchronously based on the current album's cover_image_id.
 * The component shows a loading state until the image is fetched, and handles any errors during the fetch operation.
 */
const ImageCard = () => {
    const { currentAlbum } = useGame();
    const [currentAlbumCover, setCurrentAlbumCover] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Ensures we don't attempt to update state after the component has unmounted
        const isComponentMounted = true;

        /**
         * Fetches the album cover image from the server.
         * Sets the image URL in state if successful, or sets an error state if an error occurs.
         */
        const fetchAlbumCover = async () => {
            if (!currentAlbum?.cover_image_id) {
                setIsLoading(false);
                setCurrentAlbumCover('');
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`https://frontend-interview.evidentinsights.com/album_covers/${currentAlbum.cover_image_id}/`, {
                    responseType: 'blob',
                });

                // If component is still mounted, update state with the fetched image URL
                if (isComponentMounted) {
                    const coverImageUrl = URL.createObjectURL(response.data);
                    setCurrentAlbumCover(coverImageUrl);
                    setError('');
                }
            } catch (error) {
                console.error('Error fetching album cover:', error);
                setError('Failed to load album cover. Please try again later.');
            } finally {
                if (isComponentMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchAlbumCover();

        // Cleanup function to revoke the created object URL to avoid memory leaks
        return () => {
            if (currentAlbumCover) {
                URL.revokeObjectURL(currentAlbumCover);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAlbum]);

    // Loading state UI
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

    // Error state UI
    if (error) {
        return <section>Error: {error}</section>;
    }

    // Display the album cover if available
    return (
        <section>
            {currentAlbumCover && (
                <Image
                    src={currentAlbumCover}
                    alt={`Cover for ${currentAlbum?.name || 'the album'}`}
                    width={250}
                    height={250}
                />
            )}
        </section>
    );
};

export default ImageCard;
