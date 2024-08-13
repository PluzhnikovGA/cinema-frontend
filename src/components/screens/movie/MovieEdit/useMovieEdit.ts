'use client';

import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { MovieService } from '@/services/movie.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

import { IMovieEditInput } from './movieEdit.interface';

export default function useMovieEdit(
	setValue: UseFormSetValue<IMovieEditInput>
) {
	const { push } = useRouter();
	const { id } = useParams();

	const movieId = String(id);

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastError(error, 'Get movie');
			},
			enabled: !!id,
		}
	);

	const { mutateAsync } = useMutation(
		'updateMovie',
		(data: IMovieEditInput) => MovieService.updateMovie(movieId, data),
		{
			onError(error) {
				toastError(error, 'Update movie');
			},
			onSuccess() {
				toastr.success('Update movie', 'Update was successful');
				push(getAdminUrl('movies'));
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
}
