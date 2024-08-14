'use client';

import { Controller, useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Button } from '@/ui/FormElements/Button/Button';
import { ForwardedField } from '@/ui/FormElements/Field/Field';
import SlugField from '@/ui/FormElements/SlugField/SlugField';
import UploadField from '@/ui/FormElements/UploadField/UploadField';
import formStyles from '@/ui/FormElements/adminForm.module.scss';
import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';
import generateSlug from '@/utils/string/generateSlug';

import { IActorEditInput } from './actorEdit.interface';
import useActorEdit from './useActorEdit';

const TITLE = 'Edit actor';

export default function ActorEdit() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useActorEdit(setValue);

	return (
		<Meta title={TITLE}>
			<AdminNavigation />
			<Heading title={TITLE} />
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} name="actorForm" />
				) : (
					<>
						<div className={formStyles.fields}>
							<ForwardedField
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder="Name"
								error={errors.name}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									setValue('slug', generateSlug(getValues('name')));
								}}
							/>
						</div>

						<Controller
							control={control}
							name="photo"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="actors"
									placeholder="Photo"
								/>
							)}
							rules={{
								required: 'Photo is required!',
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
}
