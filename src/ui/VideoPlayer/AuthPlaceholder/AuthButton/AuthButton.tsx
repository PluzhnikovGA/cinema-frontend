import Link from 'next/link';

import { getMovieUrl } from '@/configs/url.config';

import styles from './AuthButton.module.scss';

interface IAuthButtonProps {
	slug: string;
}

export default function AuthButton(props: IAuthButtonProps): JSX.Element {
	const { slug } = props;
	return (
		<Link href={`/auth?redirect=${getMovieUrl(slug)}`} className={styles.btn}>
			Sign in
		</Link>
	);
}
