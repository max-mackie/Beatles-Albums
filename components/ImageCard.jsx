import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGame } from '../app/context/GameProvider';
import Image from 'next/image';

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
    }, [currentAlbum]); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return <section>Loading album cover...</section>;
    }
    return (
        <section className="">
            {currentAlbumCover && 
                <Image 
                    src={currentAlbumCover} 
                    alt={`Cover for ${currentAlbum?.name}`}
                    width={200}
                    height={200}
                />}
        </section>
    );
};

export default ImageCard;
