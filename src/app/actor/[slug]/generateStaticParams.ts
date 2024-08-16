import { IActor } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';

export async function generateStaticParams() {
	try {
		const { data: actors } = await ActorService.getAll();

		return actors.map((actor: IActor) => ({
			slug: actor.slug,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}
