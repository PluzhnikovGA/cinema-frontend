'use client';

import Banner from '@/ui/Banner/Banner';
import Gallery from '@/ui/Gallery/Gallery';
import { IGalleryItem } from '@/ui/Gallery/gallery.interface';
import { SubHeading } from '@/ui/SubHeading/SubHeading';
import VideoPlayer from '@/ui/VideoPlayer/VideoPlayer';

import { IMovie } from '@/shared/types/movie.types';

import { Meta } from '@/utils/meta/Meta';

import { Error404 } from '../notFound/Error404';

import Content from './Content/Content';
import RateMovie from './MovieEdit/RateMovie/RateMovie';
import useCountOpened from './MovieEdit/useCountOpened';

interface IMovieProps {
	movie: IMovie;
	similarMovies: IGalleryItem[];
	notFound: boolean;
}

export default function Movie(props: IMovieProps): JSX.Element {
	const { movie, similarMovies, notFound } = props;
	useCountOpened(movie.slug);

	return notFound ? (
		<Error404 />
	) : (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<VideoPlayer videoSource={movie.videoUrl} slug={movie.slug} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<RateMovie slug={movie.slug} movieId={movie._id} />
		</Meta>
	);
}
