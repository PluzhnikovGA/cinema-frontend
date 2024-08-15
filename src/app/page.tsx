import { NextPage } from 'next';

import { Home } from '@/components/screens/home/Home';

import { IGalleryItem } from '@/ui/Gallery/gallery.interface';
import { ISlide } from '@/ui/Slider/slider.interface';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import { getActorUrl, getMovieUrl } from '@/configs/url.config';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	slides: ISlide[];
	trendingMovies: IGalleryItem[];
	actors: IGalleryItem[];
}

const HomePage: NextPage = async () => {
	const response = await getStaticData();

	return <Home {...response} />;
};

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const { data: movies } = await MovieService.getAll();
		const { data: dataActors } = await ActorService.getAll();
		const dataTrendingMovies = await MovieService.getMostPopular();

		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: getMovieUrl(movie.slug),
			subTitle: getGenresList(movie.genres),
			title: movie.title,
			bigPoster: movie.bigPoster,
		}));

		const actors: IGalleryItem[] = dataActors.slice(0, 10).map((actor) => ({
			posterPath: actor.photo,
			name: actor.name,
			link: getActorUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}));

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 10)
			.map((movie) => ({
				posterPath: movie.poster,
				name: movie.title,
				link: getMovieUrl(movie.slug),
			}));

		return {
			slides,
			trendingMovies: trendingMovies,
			actors: actors,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return {
			slides: [],
			trendingMovies: [],
			actors: [],
		};
	}
}

export default HomePage;
