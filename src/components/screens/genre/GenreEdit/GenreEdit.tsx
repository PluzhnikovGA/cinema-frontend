'use client';

import { Controller, useForm } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';

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

import { IGenreEditInput } from './genreEdit.interface';
import useGenreEdit from './useGenreEdit';

const TITLE = 'Edit genre';

export default function GenreEdit() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useGenreEdit(setValue);

	return (
		<Meta title={TITLE}>
			<AdminNavigation />
			<Heading title={TITLE} />
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} name="genreForm" />
				) : (
					<>
						<div className={formStyles.fields}>
							<ForwardedField
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={(e: React.MouseEvent<HTMLButtonElement>) => {
										e.preventDefault();
										setValue('slug', generateSlug(getValues('name')));
									}}
								/>
							</div>

							<ForwardedField
								{...register('icon', {
									required: 'Icon is required',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>

						<Controller
							control={control}
							name="description"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<TextEditor
									onChange={onChange}
									value={value}
									placeholder="Description"
									error={error}
								/>
							)}
							rules={{
								validate: {
									require: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'description is required!',
								},
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
}
