'use client';

import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ActorService } from '@/services/actor.service';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toastError';

import { getAdminUrl } from '@/configs/url.config';

import { IActorEditInput } from './actorEdit.interface';

export default function useActorEdit(
	setValue: UseFormSetValue<IActorEditInput>
) {
	const { push } = useRouter();
	const { id } = useParams();

	const actorId = String(id);

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastError(error, 'Get actor');
			},
			enabled: !!id,
		}
	);

	const { mutateAsync } = useMutation(
		'updateActor',
		(data: IActorEditInput) => ActorService.updateActor(actorId, data),
		{
			onError(error) {
				toastError(error, 'Update actor');
			},
			onSuccess() {
				toastr.success('Update actor', 'Update was successful');
				push(getAdminUrl('actors'));
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
}
