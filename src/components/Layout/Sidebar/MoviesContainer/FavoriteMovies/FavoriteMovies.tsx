import useFavorites from '@/components/screens/favorites/useFavorites';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { useAuth } from '@/hooks/useAuth';

import { MoviesList } from '../MoviesList/MoviesList';

import styles from './FavoriteMovies.module.scss';

export function FavoriteMovies(): JSX.Element {
	const { isLoading, favoriteMovies } = useFavorites();
	const { user } = useAuth();

	return !user ? (
		<div className={styles.notAuth}>
			For viewing favorites, please authorize!
		</div>
	) : (
		<MoviesList
			link="/favorites"
			movies={favoriteMovies?.slice(0, 5) || []}
			title="Favorites"
		/>
	);
}
