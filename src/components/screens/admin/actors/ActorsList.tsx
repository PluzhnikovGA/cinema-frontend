'use client';

import AdminHeader from '@/ui/AdminHeader/AdminHeader';
import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import AdminTable from '@/ui/AdminTable/AdminTable';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import { useActors } from './useActors';

export default function ActorsList(): JSX.Element {
	const {
		handleSearch,
		isLoading,
		data,
		searchTerm,
		deleteAsync,
		createAsync,
	} = useActors();
	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Count movies']}
			/>
		</Meta>
	);
}
