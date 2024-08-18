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

	async getBySlug(slug: string) {
		return axios.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`));
	},

	async createMovie() {
		return axios.post<string>(getMoviesUrl(''));
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data);
	},

	async updateCountOpenedMovie(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug,
		});
	},

	async getMostPopular() {
		return axiosClassic
			.get<IMovie[]>(getMoviesUrl('/most-popular'))
			.then((response) => response.data);
	},

	async getByGenre(genresIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genre'), {
			genresIds,
		});
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`));
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`));
	},
};
