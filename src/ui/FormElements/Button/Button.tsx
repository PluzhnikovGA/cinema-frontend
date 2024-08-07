import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
}

export function Button(props: ButtonProps): JSX.Element {
	const { children, className, ...rest } = props;

	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	);
}
