import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGame } from '../app/context/GameProvider';

const ImageCard = () => {
    const { currentAlbum } = useGame();
    const [currentAlbumCover, setCurrentAlbumCover] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add a loading state

    useEffect(() => {
        let isComponentMounted = true; // flag to handle async operation

        const fetchAlbumCover = async () => {
            if (currentAlbum && currentAlbum.cover_image_id) {
                setIsLoading(true); // Start loading
                try {
                    const response = await axios.get(`https://frontend-interview.evidentinsights.com/album_covers/${currentAlbum.cover_image_id}/`, {
                        responseType: 'blob'
                    });
                    // Only update state if the component is still mounted
                    if (isComponentMounted) {
                        const coverImageUrl = URL.createObjectURL(response.data);
                        setCurrentAlbumCover(coverImageUrl);
                        setIsLoading(false); // Stop loading after successful fetch
                    }
                } catch (error) {
                    console.error('Error fetching album cover:', error);
                    if (isComponentMounted) {
                        setCurrentAlbumCover(''); // Use an empty string or a placeholder image URL
                        setIsLoading(false); // Stop loading on error
                    }
                }
            } else {
                // Ensure loading is false if there's no album to fetch
                setIsLoading(false);
            }
        };

        fetchAlbumCover();

        // Cleanup function to revoke object URL and handle component unmount
        return () => {
            isComponentMounted = false;
            if (currentAlbumCover) {
                URL.revokeObjectURL(currentAlbumCover);
            }
        };
    }, [currentAlbum]); // Depend on currentAlbum to refetch when it changes

    // Display a loading indicator while the image is being fetched
    if (isLoading) {
        return <div>Loading album cover...</div>;
    }

    return (
        <div>
            {currentAlbumCover && <img src={currentAlbumCover} alt={`Cover for ${currentAlbum?.name}`} />}
        </div>
    );
};

export default ImageCard;
