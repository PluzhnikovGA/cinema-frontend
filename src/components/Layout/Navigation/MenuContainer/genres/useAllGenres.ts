'use client';

import { useQuery } from 'react-query';

import { IGenre } from '@/shared/types/movie.types';

import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toastError';

import { getGenreUrl } from '@/configs/url.config';

import { IMenuItem } from '../menu.interface';

export function useAllGenres() {
	const queryData = useQuery<IMenuItem[], Error>(
		'allGenreMenu',
		async () => {
			const { data } = await GenreService.getAll();
			return data
				.filter((genre: IGenre) => genre.name)
				.map((genre: IGenre) => ({
					icon: genre.icon,
					link: getGenreUrl(genre.slug),
					title: genre.name,
				}));
		},
		{
			select: (data) => data.slice(0, 4),
			onError(error) {
				toastError(error, 'Error fetching all genres:');
			},
		}
	);

	return queryData;
}
