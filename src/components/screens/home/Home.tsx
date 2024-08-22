'use client';

import { useEffect, useState } from 'react';

import Gallery from '@/ui/Gallery/Gallery';
import { IGalleryItem } from '@/ui/Gallery/gallery.interface';
import { Heading } from '@/ui/Heading/Heading';
import Slider from '@/ui/Slider/Slider';
import { ISlide } from '@/ui/Slider/slider.interface';
import { SubHeading } from '@/ui/SubHeading/SubHeading';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import { Meta } from '@/utils/meta/Meta';
import { getGenresList } from '@/utils/movie/getGenresList';

import { getActorUrl, getMovieUrl } from '@/configs/url.config';

import { errorCatch } from '@/api/api.helper';

interface IGetStaticDataResponse {
	slides: ISlide[];
	trendingMovies: IGalleryItem[];
	actors: IGalleryItem[];
}

const TITLE = 'Watch movie online';
const DESCRIPTION =
	'Watch MovieApp movies and TV shows online or stream right to your browser';

export function Home(): JSX.Element {
	const [data, setData] = useState<IGetStaticDataResponse | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getStaticData();
				setData(result);
			} catch (error) {
				console.log(errorCatch(error));
				setData({
					slides: [],
					trendingMovies: [],
					actors: [],
				});
			}
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	const { slides, trendingMovies, actors } = data;

	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className="text-gray-300 mb-8 text-xl" />

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title={'Trending now'} />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div className="my-10">
				<SubHeading title={'Best actors'} />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	);
}

async function getStaticData(): Promise<IGetStaticDataResponse> {
	try {
		const { data: movies } = await MovieService.getAll();
		const { data: dataActors } = await ActorService.getAll();
		const dataTrendingMovies = await MovieService.getMostPopular();

		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: getMovieUrl(movie.slug),
			subTitle: getGenresList(movie.genres),
			title: movie.title,
			bigPoster: movie.bigPoster,
		}));

		const actors: IGalleryItem[] = dataActors.slice(0, 10).map((actor) => ({
			posterPath: actor.photo,
			name: actor.name,
			link: getActorUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}));

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 10)
			.map((movie) => ({
				posterPath: movie.poster,
				name: movie.title,
				link: getMovieUrl(movie.slug),
			}));

		return {
			slides,
			trendingMovies,
			actors,
		};
	} catch (error) {
		console.log(errorCatch(error));

		return {
			slides: [],
			trendingMovies: [],
			actors: [],
		};
	}
}
