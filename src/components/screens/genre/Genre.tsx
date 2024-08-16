import CatalogMovies from '@/ui/CatalogMovies/CatalogMovies';

import { IGenre, IMovie } from '@/shared/types/movie.types';

import { Error404 } from '../notFound/Error404';

interface IGenreProps {
	movies: IMovie[];
	genre: IGenre;
	notFound: boolean;
}

export default function Genre(props: IGenreProps): JSX.Element {
	const { movies, genre, notFound } = props;
	return notFound ? (
		<Error404 />
	) : (
		<CatalogMovies
			movies={movies || []}
			title={genre.name}
			description={genre.description}
		/>
	);
}
