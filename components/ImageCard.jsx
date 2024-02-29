import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGame } from '../app/context/GameProvider';

const ImageCard = () => {
    const { currentAlbum } = useGame();
    const [currentAlbumCover, setCurrentAlbumCover] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isComponentMounted = true; // flag to handle async operation

        const fetchAlbumCover = async () => {
            if (currentAlbum && currentAlbum.cover_image_id) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://frontend-interview.evidentinsights.com/album_covers/${currentAlbum.cover_image_id}/`, {
                        responseType: 'blob'
                    });
                    // Only update state if the component is still mounted
                    if (isComponentMounted) {
                        const coverImageUrl = URL.createObjectURL(response.data);
                        setCurrentAlbumCover(coverImageUrl);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error fetching album cover:', error);
                    if (isComponentMounted) {
                        setCurrentAlbumCover('');
                        setIsLoading(false); 
                    }
                }
            } else {
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
    }, [currentAlbum]);

    if (isLoading) {
        return <div>Loading album cover...</div>;
    }
    return (
        <div className="">
            {currentAlbumCover && <img src={currentAlbumCover} alt={`Cover for ${currentAlbum?.name}`} />}
        </div>
    );
};

export default ImageCard;
