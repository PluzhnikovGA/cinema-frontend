import CatalogMovies from '@/ui/CatalogMovies/CatalogMovies';

import { IMovie } from '@/shared/types/movie.types';

interface ITrendingProps {
	movies: IMovie[];
}

export default function Trending(props: ITrendingProps): JSX.Element {
	const { movies } = props;
	return (
		<CatalogMovies
			movies={movies || []}
			title="Trending movies"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	);
}
