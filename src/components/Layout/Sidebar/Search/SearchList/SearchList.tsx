import Image from 'next/image';
import Link from 'next/link';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/configs/url.config';

import styles from './SearchList.module.scss';

interface ISearchListProps {
	movies: IMovie[];
}

export function SearchList(props: ISearchListProps): JSX.Element {
	const { movies } = props;

	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map(
					(movie: IMovie): JSX.Element => (
						<Link key={movie._id} href={getMovieUrl(movie.slug)}>
							<Image
								src={movie.poster}
								width={50}
								height={50}
								alt={movie.title}
								objectFit="cover"
								objectPosition="top"
								draggable={false}
							/>
							<span>{movie.title}</span>
						</Link>
					)
				)
			) : (
				<div className="text-white text-center my-4">Movie not found</div>
			)}
		</div>
	);
}
