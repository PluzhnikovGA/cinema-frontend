import CatalogMovies from '@/ui/CatalogMovies/CatalogMovies';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { Error404 } from '../notFound/Error404';

interface IActorProps {
	movies: IMovie[];
	actor: IActor;
	notFound: boolean;
}

export default function Actor(props: IActorProps): JSX.Element {
	const { movies, actor, notFound } = props;
	return notFound ? (
		<Error404 />
	) : (
		<CatalogMovies movies={movies || []} title={actor.name} />
	);
}
