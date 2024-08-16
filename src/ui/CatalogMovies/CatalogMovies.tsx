import { IMovie } from '@/shared/types/movie.types';

import { Meta } from '@/utils/meta/Meta';

import { getMovieUrl } from '@/configs/url.config';

import Description from '../Description/Description';
import GalleryItem from '../Gallery/GalleryItem/GalleryItem';
import { Heading } from '../Heading/Heading';

import styles from './CatalogMovies.module.scss';

interface ICatalogMoviesProps {
	title: string;
	description?: string;
	movies: IMovie[];
}

export default function CatalogMovies(props: ICatalogMoviesProps): JSX.Element {
	const { title, description, movies } = props;

	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />

			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{movies.map(
					(movie: IMovie): JSX.Element => (
						<GalleryItem
							key={movie._id}
							item={{
								name: movie.title,
								link: getMovieUrl(movie.slug),
								posterPath: movie.bigPoster,
								content: { title: movie.title },
							}}
							variant="horizontal"
						/>
					)
				)}
			</section>
		</Meta>
	);
}
