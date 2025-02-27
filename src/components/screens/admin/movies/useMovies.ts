'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/ui/AdminTable/adminTable.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

export function useMovies() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debounceSearch = useDebounce({ searchTerm, delay: 500 });
	const { push } = useRouter();

	const queryData = useQuery(
		['moviesList', debounceSearch],
		() => MovieService.getAll(debounceSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movies/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'Movies list');
			},
		}
	);

	const { mutateAsync: createAsync } = useMutation(
		['createMovie'],
		() => MovieService.createMovie(),
		{
			onError: (error) => {
				toastError(error, 'Create movie');
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create movie', 'create was successful');
				push(getAdminUrl(`movies/edit/${_id}`));
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		['deleteMovie'],
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, 'Delete movie');
			},
			onSuccess: () => {
				toastr.success('Delete movie', 'delete was successful');
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
