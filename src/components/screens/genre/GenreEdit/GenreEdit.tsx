'use client';

import { useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { ForwardedField } from '@/ui/FormElements/Field/Field';
import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';

import styles from './GenreEdit.module.scss';
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
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useGenreEdit(setValue);

	return (
		<Meta title={TITLE}>
			<AdminNavigation />
			<Heading title={TITLE} />
			<form onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} name="genreForm" />
				) : (
					<>
						<div>
							<ForwardedField
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>Slug</div>

							<ForwardedField
								{...register('icon', {
									required: 'Icon is required',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
							<button>Update</button>
						</div>
					</>
				)}
			</form>
		</Meta>
	);
}
