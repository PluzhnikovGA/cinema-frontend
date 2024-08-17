'use client';

import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { UserService } from '@/services/user.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

import { IUserEditInput } from './userEdit.interface';

export default function useUserEdit(setValue: UseFormSetValue<IUserEditInput>) {
	const { push } = useRouter();
	const { id } = useParams();

	const userId = String(id);

	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				setValue('email', data.email), setValue('isAdmin', data.isAdmin);
			},
			onError(error) {
				toastError(error, 'Get user');
			},
			enabled: !!id,
		}
	);

	const { mutateAsync } = useMutation(
		'updateUser',
		(data: IUserEditInput) => UserService.updateUser(userId, data),
		{
			onError(error) {
				toastError(error, 'Update user');
			},
			onSuccess(data) {
				toastr.success('Update user', 'Update was successful');
				push(getAdminUrl('users'));
			},
		}
	);

	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
}
