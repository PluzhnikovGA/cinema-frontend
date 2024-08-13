'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/AdminTable/adminTable.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { GenreService } from '@/services/genre.service';

import { convertMongoDate } from '@/utils/data/convertMongoDate';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

export function useGenres() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debounceSearch = useDebounce({ searchTerm, delay: 500 });

	const { push } = useRouter();

	const queryData = useQuery(
		['genresList', debounceSearch],
		() => GenreService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genres/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'Genres list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: createAsync } = useMutation(
		['createGenre'],
		() => GenreService.createGenre(),
		{
			onError: (error) => {
				toastError(error, 'Create genre');
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create genre', 'create was successful');
				push(getAdminUrl(`genres/edit/${_id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		['deleteGenre'],
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastError(error, 'Delete genre');
			},
			onSuccess: () => {
				toastr.success('Delete genre', 'delete was successful');
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
