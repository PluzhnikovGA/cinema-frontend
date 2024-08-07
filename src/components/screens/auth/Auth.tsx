'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/ui/FormElements/Button/Button';
import { Heading } from '@/ui/Heading/Heading';

import { useAuth } from '@/hooks/useAuth';

import { Meta } from '@/utils/meta/Meta';

import styles from './Auth.module.scss';
import { AuthFields } from './AuthField/AuthFields';
import { IAuthInput } from './auth.interface';
import { useAuthRedirect } from './useAuthRedirect';

const TITLE = 'Auth';

export function Auth(): JSX.Element {
	useAuthRedirect();

	const { isLoading } = useAuth();

	const [type, setType] = useState<'login' | 'register'>('login');
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	});

	const login = (data: any) => {
		console.table(data);
	};
	const register = (data: any) => {
		console.table(data);
	};

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data);
		else if (type === 'register') register(data);

		reset();
	};

	return (
		<Meta title={TITLE}>
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title={TITLE} className="mb-6" />

					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Login
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	);
}
