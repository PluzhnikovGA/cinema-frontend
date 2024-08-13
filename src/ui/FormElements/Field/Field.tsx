import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';

import styles from './Field.module.scss';

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	error?: FieldError;
}

function Field(
	props: IFieldProps,
	ref: React.Ref<HTMLInputElement>
): JSX.Element {
	const { placeholder, error, type = 'text', style, ...rest } = props;
	return (
		<div className={cn(styles.common, styles.field)} style={style}>
			<label>
				<span>{placeholder}</span>
				<input type={type} ref={ref} {...rest} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	);
}

export const ForwardedField = forwardRef(Field);
