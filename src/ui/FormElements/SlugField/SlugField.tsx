import { FieldError, UseFormRegister } from 'react-hook-form';

import { ForwardedField } from '../Field/Field';

import styles from './SlugField.module.scss';

interface ISlugFieldProps {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function SlugField(props: ISlugFieldProps): JSX.Element {
	const { error, register, generate } = props;

	return (
		<div className={styles.wrapper}>
			<ForwardedField
				{...register('slug', {
					required: 'Slug is required',
				})}
				placeholder="Slug"
				error={error}
			/>
			<button className={styles.badge} onClick={generate}>
				generate
			</button>
		</div>
	);
}
