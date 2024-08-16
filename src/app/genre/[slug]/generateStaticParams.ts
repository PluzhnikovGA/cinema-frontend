import { IGenre } from '@/shared/types/movie.types';

import { GenreService } from '@/services/genre.service';

export async function generateStaticParams() {
	try {
		const { data: genres } = await GenreService.getAll();

		return genres.map((genre: IGenre) => ({
			slug: genre.slug,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}
