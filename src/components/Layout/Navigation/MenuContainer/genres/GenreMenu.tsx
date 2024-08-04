'use client';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';

import { Menu } from '../Menu/Menu';

import { useAllGenres } from './useAllGenres';

export function GenreMenu(): JSX.Element {
	const { isLoading, data } = useAllGenres();

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader
				count={5}
				name={'genreMenu'}
				height={20}
				firstItemClassName="mt-0"
				restItemsClassName="mt-6"
			/>
		</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	);
}
