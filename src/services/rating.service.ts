import { getRatingsUrl } from '@/configs/api.config';

import axios from '@/api/interceptors';

export const RatingService = {
	async getRating(_id: string) {
		return await axios.get<number>(getRatingsUrl(`/${_id}`));
	},

	async setRating(movieId: string, value: number) {
		return await axios.post<string>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		});
	},
};
