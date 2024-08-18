'use client';

import { useQuery } from 'react-query';

import { UserService } from '@/services/user.service';

export default function useFavorites() {
	const {
		isLoading,
		data: favoriteMovies,
		refetch,
	} = useQuery('favoriteMovies', () => UserService.getFavorites(), {
		select: ({ data }) => data,
	});

	return {
		isLoading,
		favoriteMovies,
		refetch,
	};
}
