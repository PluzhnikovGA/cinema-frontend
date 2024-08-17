import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toastError';

import { IProfileInput } from './profile.interface';

export default function useProfile(setValue: UseFormSetValue<IProfileInput>) {
	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
		onSuccess: ({ data }) => {
			setValue('email', data.email);
		},
		onError(error) {
			toastError(error, 'Get user');
		},
	});

	const { mutateAsync } = useMutation(
		'updateProfile',
		(data: IProfileInput) => {
			return UserService.updateProfile(data);
		},
		{
			onError(error) {
				toastError(error, 'Update user');
			},
			onSuccess() {
				toastr.success('Update user', 'Update was successful');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
}
