import AuthButton from './AuthButton/AuthButton';
import styles from './AuthPlaceholder.module.scss';

interface IAuthPlaceholderProps {
	slug: string;
}

export default function AuthPlaceholder(
	props: IAuthPlaceholderProps
): JSX.Element {
	const { slug } = props;

	return (
		<div className={styles.placeholder}>
			<div>
				<div>You must be logged in to start watching</div>
				<AuthButton slug={slug} />
			</div>
		</div>
	);
}
