'use client';

import AdminHeader from '@/ui/AdminHeader/AdminHeader';
import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import AdminTable from '@/ui/AdminTable/AdminTable';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import styles from './UsersList.module.scss';
import { useUsers } from './useUsers';

export default function UsersList(): JSX.Element {
	const { handleSearch, isLoading, data, searchTerm, deleteAsync } = useUsers();
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register']}
			/>
		</Meta>
	);
}
