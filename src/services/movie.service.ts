import { IMovieEditInput } from '@/components/screens/movie/MovieEdit/movieEdit.interface';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/configs/api.config';

import { axiosClassic } from '@/api/interceptors';
import axios from '@/api/interceptors';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`));
	},

	async createMovie() {
		return axios.post<string>(getMoviesUrl(''));
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data);
	},

	async getMostPopular() {
		return axiosClassic
			.get<IMovie[]>(getMoviesUrl('/most-popular'))
			.then((response) => response.data);
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`));
	},
};
