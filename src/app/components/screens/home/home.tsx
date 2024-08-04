import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

const TITLE = 'Watch movie online';
const DESCRIPTION =
	'Watch MovieApp movies and TV shows online or stream right to your browser';

export function Home(): JSX.Element {
	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className="text-gray-300 mb-8 text-xl" />
		</Meta>
	);
}
