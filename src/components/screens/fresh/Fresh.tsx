import CatalogMovies from '@/ui/CatalogMovies/CatalogMovies';

import { IMovie } from '@/shared/types/movie.types';

interface IFreshProps {
	movies: IMovie[];
}

export default function Fresh(props: IFreshProps): JSX.Element {
	const { movies } = props;
	return (
		<CatalogMovies
			movies={movies || []}
			title="Fresh movies"
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	);
}
