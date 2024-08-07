import { FormState, UseFormRegister } from 'react-hook-form';

import { ForwardedField } from '@/ui/FormElements/Field/Field';

import { validEmail } from '@/shared/regex';

import { IAuthInput } from '../auth.interface';

interface IAuthFieldProps {
	register: UseFormRegister<any>;
	formState: FormState<IAuthInput>;
	isPasswordRequired?: boolean;
}

export function AuthFields(props: IAuthFieldProps): JSX.Element {
	const {
		register,
		formState: { errors },
		isPasswordRequired = false,
	} = props;

	return (
		<>
			<ForwardedField
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please, enter a valid email address',
					},
				})}
				placeholder="Email"
				error={errors.email}
			/>
			<ForwardedField
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols',
								},
							}
						: {}
				)}
				placeholder="Password"
				type="password"
				error={errors.password}
			/>
		</>
	);
}
