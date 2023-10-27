import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentuser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentuser();


    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId)
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } });
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavorites();

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = !isFavorite ? AiOutlinePlus : AiOutlineCheck;

    return (
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 lg:w-10 h-6 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transistion hover:border-neutral-300  ">
            <Icon size={20} className='text-white' />
        </div>
    )
}


export default FavoriteButton;