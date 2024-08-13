'use client';

import AdminHeader from '@/ui/AdminHeader/AdminHeader';
import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import AdminTable from '@/ui/AdminTable/AdminTable';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import { useGenres } from './useGenres';

export default function GenresList(): JSX.Element {
	const {
		handleSearch,
		isLoading,
		data,
		searchTerm,
		deleteAsync,
		createAsync,
	} = useGenres();
	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Slug']}
			/>
		</Meta>
	);
}
