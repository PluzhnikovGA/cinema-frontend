import dynamic from 'next/dynamic';

import { PopularMovies } from './PopularMovies/PopularMovies';

const DynamicFavoriteMovies = dynamic(
	() =>
		import('./FavoriteMovies/FavoriteMovies').then((mod) => mod.FavoriteMovies),
	{
		ssr: false,
	}
);

export function MoviesContainer(): JSX.Element {
	return (
		<div>
			<PopularMovies />
			<DynamicFavoriteMovies />
		</div>
	);
}
