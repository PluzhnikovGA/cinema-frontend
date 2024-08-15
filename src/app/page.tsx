import { GetStaticProps, NextPage } from 'next';

import { Home } from '@/components/screens/home/Home';

import { ISlide } from '@/ui/Slider/slider.interface';

import { MovieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import { getMovieUrl } from '@/configs/url.config';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	slides: ISlide[];
}

const HomePage: NextPage = async () => {
	const response = await getStaticData();

	return <Home {...response} />;
};

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const { data: movies } = await MovieService.getAll();

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster,
		}));

		return {
			slides,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return {
			slides: [],
		};
	}
}

export default HomePage;
