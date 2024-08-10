'use client';

import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { GenreService } from '@/services/genre.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

import { IGenreEditInput } from './genreEdit.interface';

export default function useGenreEdit(
	setValue: UseFormSetValue<IGenreEditInput>
) {
	const { push } = useRouter();
	const { id } = useParams();

	const genreId = String(id);

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastError(error, 'Get genre');
			},
			enabled: !!id,
		}
	);

	const { mutateAsync } = useMutation(
		'updateGenre',
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onError(error) {
				toastError(error, 'Update genre');
			},
			onSuccess() {
				toastr.success('Update genre', 'Update was successful');
				push(getAdminUrl('genres'));
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
}
