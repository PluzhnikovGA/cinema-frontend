import { useQuery } from 'react-query';

import { ISelectOptions } from '@/ui/Select/Select';

import { IActor } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';

import { toastError } from '@/utils/toastError';

export default function useAdminActors() {
	const queryData = useQuery(
		'actorsInAdminPanel',
		() => ActorService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(genre: IActor): ISelectOptions => ({
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
