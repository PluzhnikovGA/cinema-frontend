import { getGenreUrl, getMovieUrl } from 'configs/url.config';
import Image from 'next/image';
import Link from 'next/link';

import { MaterialIcon } from 'ui/MaterialIcon/MaterialIcon';

import { IGenre, IMovie } from '@/shared/types/movie.types';

import { getGenresListEach } from '@/utils/movie/getGenresListEach';

import styles from './MovieItem.module.scss';

interface IMovieItemProps {
	movie: IMovie;
}

export function MovieItem(props: IMovieItemProps): JSX.Element {
	const { movie } = props;
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					src={movie.poster}
					width={65}
					height={97}
					alt={movie.title}
					draggable={false}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map(
							(genre: IGenre, index: number): JSX.Element => (
								<Link
									key={`${movie._id}-genre-${genre._id}`}
									href={getGenreUrl(genre.slug)}
								>
									{getGenresListEach(index, movie.genres.length, genre.name)}
								</Link>
							)
						)}
					</div>

					<div className={styles.rating}>
						<MaterialIcon name="MdStarRate" />
						<span>{movie.rating.toFixed(1)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
