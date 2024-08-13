'use client';

import AdminHeader from '@/ui/AdminHeader/AdminHeader';
import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import AdminTable from '@/ui/AdminTable/AdminTable';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import { useMovies } from './useMovies';

export default function MoviesList(): JSX.Element {
	const {
		handleSearch,
		isLoading,
		data,
		searchTerm,
		deleteAsync,
		createAsync,
	} = useMovies();
	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genres', 'Rating']}
			/>
		</Meta>
	);
}
