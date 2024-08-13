'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/AdminTable/adminTable.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { ActorService } from '@/services/actor.service';

import { convertMongoDate } from '@/utils/data/convertMongoDate';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

export function useActors() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debounceSearch = useDebounce({ searchTerm, delay: 500 });
	const { push } = useRouter();

	const queryData = useQuery(
		['actorsList', debounceSearch],
		() => ActorService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actors/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'Actors list');
			},
		}
	);

	const { mutateAsync: createAsync } = useMutation(
		['createActor'],
		() => ActorService.createActor(),
		{
			onError: (error) => {
				toastError(error, 'Create movie');
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create actor', 'create was successful');
				push(getAdminUrl(`actors/edit/${_id}`));
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		['deleteActors'],
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'Delete actor');
			},
			onSuccess: () => {
				toastr.success('Delete actor', 'Delete was successful');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			...queryData,
			handleSearch,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
}
