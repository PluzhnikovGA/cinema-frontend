import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

export async function generateStaticParams() {
	try {
		const { data: movies } = await MovieService.getAll();

		return movies.map((movie: IMovie) => ({
			slug: movie.slug,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}
