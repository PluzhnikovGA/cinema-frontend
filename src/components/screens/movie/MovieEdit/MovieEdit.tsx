'use client';

import { Controller, useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Button } from '@/ui/FormElements/Button/Button';
import { ForwardedField } from '@/ui/FormElements/Field/Field';
import SlugField from '@/ui/FormElements/SlugField/SlugField';
import TextEditor from '@/ui/FormElements/TextEditor/TextEditor';
import formStyles from '@/ui/FormElements/adminForm.module.scss';
import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';
import generateSlug from '@/utils/string/generateSlug';

import { IMovieEditInput } from './movieEdit.interface';
import useMovieEdit from './useMovieEdit';

const TITLE = 'Edit movie';

export default function MovieEdit() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useMovieEdit(setValue);

	return (
		<Meta title={TITLE}>
			<AdminNavigation />
			<Heading title={TITLE} />
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} name="movieForm" />
				) : (
					<>
						<div className={formStyles.fields}>
							<ForwardedField
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder="Title"
								error={errors.title}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.preventDefault();
									setValue('slug', generateSlug(getValues('title')));
								}}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
}
