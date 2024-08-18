'use client';

import { MaterialIcon } from '@/ui/MaterialIcon/MaterialIcon';

import { IActor, IGenre, IMovie } from '@/shared/types/movie.types';

import { getActorUrl, getGenreUrl } from '@/configs/url.config';

import styles from './Content.module.scss';
import ContentList from './ContentList/ContentList';

interface IContentProps {
	movie: IMovie;
}

export default function Content(props: IContentProps): JSX.Element {
	const { movie } = props;

	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min.</span>
			</div>
			<ContentList
				name="Genres"
				links={movie.genres.slice(0, 3).map((genre: IGenre) => ({
					_id: genre._id,
					link: getGenreUrl(genre.slug),
					title: genre.name,
				}))}
			/>
			<ContentList
				name="Actors"
				links={movie.actors.slice(0, 3).map((actor: IActor) => ({
					_id: actor._id,
					link: getActorUrl(actor.slug),
					title: actor.name,
				}))}
			/>

			<div className={styles.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
		</div>
	);
}
