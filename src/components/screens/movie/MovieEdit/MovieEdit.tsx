'use client';

import { Controller, useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Button } from '@/ui/FormElements/Button/Button';
import { ForwardedField } from '@/ui/FormElements/Field/Field';
import SlugField from '@/ui/FormElements/SlugField/SlugField';
import UploadField from '@/ui/FormElements/UploadField/UploadField';
import formStyles from '@/ui/FormElements/adminForm.module.scss';
import { Heading } from '@/ui/Heading/Heading';
import Select from '@/ui/Select/Select';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';
import generateSlug from '@/utils/string/generateSlug';

import { IMovieEditInput } from './movieEdit.interface';
import useAdminActors from './useAdminActors';
import useAdminGenres from './useAdminGenres';
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
	const { isLoading: isGenresLoading, data: genres } = useAdminGenres();
	const { isLoading: isActorsLoading, data: actors } = useAdminActors();

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
							<ForwardedField
								{...register('parameters.country', {
									required: 'Country is required',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<ForwardedField
								{...register('parameters.duration', {
									required: 'Duration is required',
								})}
								placeholder="Duration"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<ForwardedField
								{...register('parameters.year', {
									required: 'Year is required',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							<Controller
								control={control}
								name="genres"
								render={({ field, fieldState: { error } }) => (
									<Select
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										isMulti
										error={error}
										placeholder="Genres"
									/>
								)}
								rules={{
									required: 'Please select at least one genre!',
								}}
							/>

							<Controller
								control={control}
								name="actors"
								render={({ field, fieldState: { error } }) => (
									<Select
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										isMulti
										error={error}
										placeholder="Actors"
									/>
								)}
								rules={{
									required: 'Please select at least one actor!',
								}}
							/>

							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="posters"
										placeholder="Poster"
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="posters"
										placeholder="Big poster"
									/>
								)}
								rules={{
									required: 'Big poster is required!',
								}}
							/>

							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder="movies"
										placeholder="Video"
										style={{ marginTop: -25 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
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
