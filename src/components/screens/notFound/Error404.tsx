import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

const TITLE = 'Page not found';
const DESCRIPTION = '404 - Page Not Found';

export function Error404(): JSX.Element {
	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className="text-gray-300 mb-8 text-xl" />
		</Meta>
	);
}
