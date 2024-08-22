import { ICollection } from '@/components/screens/discovery/Discovery';
import { IGenreEditInput } from '@/components/screens/genre/GenreEdit/genreEdit.interface';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/configs/api.config';

import { axiosClassic } from '@/api/interceptors';
import axios from '@/api/interceptors';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('/collections'));
	},

	async getPopularGenres(limit: number = 4) {
		return axiosClassic.get<IGenre[]>(getGenresUrl('/popular'), {
			params: {
				limit,
			},
		});
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},

	async createGenre() {
		return axios.post<string>(getGenresUrl(``));
	},

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},
};
