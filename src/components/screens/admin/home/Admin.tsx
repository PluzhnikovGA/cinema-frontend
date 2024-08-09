import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import Statistics from './Statistics/Statistics';

export default function Admin(): JSX.Element {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</Meta>
	);
}
