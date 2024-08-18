import Image from 'next/image';
import Link from 'next/link';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/configs/url.config';

import FavoriteButton from '../../movie/Content/FavoriteButton/FavoriteButton';

import styles from './FavoriteItem.module.scss';

interface IFavoriteItemProps {
	movie: IMovie;
}

export default function FavoriteItem(props: IFavoriteItemProps): JSX.Element {
	const { movie } = props;

	return (
		<div className={styles.itemWrapper}>
			<FavoriteButton movieId={movie._id} />
			<Link href={getMovieUrl(movie.slug)} className={styles.item}>
				<Image
					alt={movie.title}
					src={movie.bigPoster}
					fill
					draggable={false}
					priority
				/>
				<div className={styles.title}>{movie.title}</div>
			</Link>
		</div>
	);
}
