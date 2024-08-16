import Genre from '@/components/screens/genre/Genre';

import { IGenre, IMovie } from '@/shared/types/movie.types';

import { GenreService } from '@/services/genre.service';
import { MovieService } from '@/services/movie.service';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	movies: IMovie[];
	genre: IGenre;
	notFound: boolean;
}

interface IGenrePageProps {
	params: { slug: string };
}

const GenrePage = async ({ params: { slug } }: IGenrePageProps) => {
	const response = await getStaticData(slug);

	return <Genre {...response} />;
};

async function getStaticData(slug: string): Promise<IGetStaticDataResponse> {
	try {
		const { data: genre } = await GenreService.getBySlug(slug);
		const { data: movies } = await MovieService.getByGenre([genre._id]);

		return {
			movies,
			genre,
			notFound: false,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { movies: [], genre: {} as IGenre, notFound: true };
	}
}

export default GenrePage;
