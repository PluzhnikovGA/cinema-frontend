'use client';

import { useQuery } from 'react-query';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { MovieService } from '@/services/movie.service';

import { MoviesList } from '../MoviesList/MoviesList';

export function PopularMovies(): JSX.Element {
	const { isLoading, data: popularMovies } = useQuery(
		'popularMoviesInSidebar',
		() => MovieService.getMostPopular()
	);
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader
				count={3}
				firstItemClassName="mb-4"
				restItemsClassName="mb-4"
				name={'PopularMovies'}
			/>
		</div>
	) : (
		<MoviesList
			link="/trending"
			movies={popularMovies || []}
			title="Popular movies"
		/>
	);
}
