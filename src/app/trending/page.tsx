import { NextPage } from 'next';

import Fresh from '@/components/screens/fresh/Fresh';
import Trending from '@/components/screens/trending/Trending';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	movies: IMovie[];
}

const TrendingPage: NextPage = async () => {
	const response = await getStaticData();

	return <Trending {...response} />;
};

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const movies = await MovieService.getMostPopular();

		return {
			movies,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { movies: [] };
	}
}

export default TrendingPage;
