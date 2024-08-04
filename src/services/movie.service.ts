import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/configs/api.config';

import { axiosClassic } from '@/api/interceptors';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getMostPopular() {
		return axiosClassic
			.get<IMovie[]>(getMoviesUrl('/most-popular'))
			.then((response) => response.data);
	},
};
