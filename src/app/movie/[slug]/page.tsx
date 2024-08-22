import Movie from '@/components/screens/movie/Movie';

import { IGalleryItem } from '@/ui/Gallery/gallery.interface';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMovieUrl } from '@/configs/url.config';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	movie: IMovie;
	similarMovies: IGalleryItem[];
	notFound: boolean;
}

interface IMoviePageProps {
	params: { slug: string };
}

const MoviePage = async ({ params: { slug } }: IMoviePageProps) => {
	const response = await getStaticData(slug);

	return <Movie {...response} />;
};

async function getStaticData(slug: string): Promise<IGetStaticDataResponse> {
	try {
		const { data: movie } = await MovieService.getBySlug(slug);
		const { data: dataSimilarMovies } = await MovieService.getByGenre(
			movie.genres.map((genre) => genre._id)
		);

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((movie) => ({
				name: movie.title,
				posterPath: movie.poster,
				link: getMovieUrl(movie.slug),
			}));

		return {
			movie,
			similarMovies,
			notFound: false,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { similarMovies: [], movie: {} as IMovie, notFound: true };
	}
}

export const revalidate = 60;

export default MoviePage;
