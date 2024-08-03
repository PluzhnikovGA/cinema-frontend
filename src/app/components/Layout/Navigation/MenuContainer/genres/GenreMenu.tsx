import { Menu } from '../Menu/Menu';

import { useAllGenres } from './useAllGenres';

export function GenreMenu(): JSX.Element {
	const { isLoading, data } = useAllGenres();

	return isLoading ? (
		<div className="mx-11 mb-6">Loading...</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	);
}
