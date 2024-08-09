import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import styles from './Admin.module.scss';
import Statistics from './Statistics/Statistics';

export default function Admin() {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</Meta>
	);
}
