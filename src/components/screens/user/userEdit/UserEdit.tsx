'use client';

import { Controller, useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Button } from '@/ui/FormElements/Button/Button';
import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';

import { AuthFields } from '../../auth/AuthField/AuthFields';

import useUserEdit from './useUserEdit';
import { IUserEditInput } from './userEdit.interface';

const TITLE = 'Edit user';

export default function UserEdit() {
	const { handleSubmit, register, formState, setValue, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		});

	const { isLoading, onSubmit } = useUserEdit(setValue);

	return (
		<Meta title={TITLE}>
			<AdminNavigation />
			<Heading title={TITLE} />
			<form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} name="userForm" />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.preventDefault();
										field.onChange(!field.value);
									}}
									className="text-link block mb-7"
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
}
