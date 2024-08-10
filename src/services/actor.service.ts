import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/configs/api.config';

import axios from '@/api/interceptors';

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axios.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`));
	},
};
