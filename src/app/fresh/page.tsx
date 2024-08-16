import { NextPage } from 'next';

import Fresh from '@/components/screens/fresh/Fresh';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	movies: IMovie[];
}

const FreshPage: NextPage = async () => {
	const response = await getStaticData();

	return <Fresh {...response} />;
};

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const { data: movies } = await MovieService.getAll();

		return {
			movies,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return { movies: [] };
	}
}

export default FreshPage;
