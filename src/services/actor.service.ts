import { IActorEditInput } from '@/components/screens/actor/ActorEdit/actorEdit.interface';

import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/configs/api.config';

import axios from '@/api/interceptors';

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axios.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`));
	},

	async createActor() {
		return axios.post<string>(getActorsUrl(''));
	},

	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data);
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`));
	},
};
