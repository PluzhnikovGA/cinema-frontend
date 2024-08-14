import { useQuery } from 'react-query';

import { ISelectOptions } from '@/ui/Select/Select';

import { IGenre } from '@/shared/types/movie.types';

import { GenreService } from '@/services/genre.service';

import { toastError } from '@/utils/toastError';

export default function useAdminGenres() {
	const queryData = useQuery(
		'genresInAdminPanel',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(genre: IGenre): ISelectOptions => ({
						label: genre.name,
						value: genre._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Genres');
			},
		}
	);

	return queryData;
}
