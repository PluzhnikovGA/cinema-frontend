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

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},
};
