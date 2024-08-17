'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/ui/FormElements/Button/Button';
import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Meta } from '@/utils/meta/Meta';

import { AuthFields } from '../auth/AuthField/AuthFields';

import styles from './Profile.module.scss';
import { IProfileInput } from './profile.interface';
import useProfile from './useProfile';

const TITLE = 'Profile';

export default function Profile() {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { onSubmit, isLoading } = useProfile(setValue);

	return (
		<Meta title={TITLE}>
			<Heading title={TITLE} className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} name="profile" />
				) : (
					<AuthFields formState={formState} register={register} />
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	);
}
