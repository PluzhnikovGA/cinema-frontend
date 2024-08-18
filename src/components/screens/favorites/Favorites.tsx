'use client';

import { Heading } from '@/ui/Heading/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { IMovie } from '@/shared/types/movie.types';

import { Meta } from '@/utils/meta/Meta';

import FavoriteItem from './FavoriteItem/FavoriteItem';
import styles from './Favorites.module.scss';
import useFavorites from './useFavorites';

const TITLE = 'Favorites';

export default function Favorites(): JSX.Element {
	const { favoriteMovies, isLoading } = useFavorites();

	return (
		<Meta title={TITLE}>
			<Heading title={TITLE} />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						firstItemClassName={styles.SkeletonLoader}
						restItemsClassName={styles.SkeletonLoader}
						containerClassName={styles.containerLoader}
						name="favorite"
					/>
				) : (
					favoriteMovies?.map(
						(movie: IMovie): JSX.Element => (
							<FavoriteItem key={`favorite-${movie._id}`} movie={movie} />
						)
					)
				)}
			</section>
		</Meta>
	);
}
