import Link from 'next/link';

import { IMovie } from '@/shared/types/movie.types';

import { MovieItem } from './MovieItem/MovieItem';
import styles from './MoviesList.module.scss';
import { IMoviesList } from './movieList.interface';

interface IMoviesListProps extends IMoviesList {}

export function MoviesList(props: IMoviesListProps): JSX.Element {
	const { link, movies, title } = props;

	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map(
				(movie: IMovie): JSX.Element => (
					<MovieItem key={`popular-${movie._id}`} movie={movie} />
				)
			)}
			<Link href={link} className={styles.button}>
				See more
			</Link>
		</div>
	);
}
