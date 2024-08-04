import { FavoriteMovies } from './FavoriteMovies/FavoriteMovies';
import { PopularMovies } from './PopularMovies/PopularMovies';

export function MoviesContainer(): JSX.Element {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	);
}
