import Description from '@/ui/Description/Description';
import { Heading } from '@/ui/Heading/Heading';

import { Meta } from '@/utils/meta/Meta';

import { Error404 } from '../notFound/Error404';

import CollectionItem from './CollectionItem/CollectionItem';
import styles from './Collections.module.scss';

export interface ICollection {
	_id: string;
	image: string;
	title: string;
	slug: string;
}

interface ICollectionsProps {
	collections: ICollection[];
	notFound: boolean;
}

const TITLE = 'Discovery';
const DESCRIPTION = ' In this section you will find all genres on our site';

export default function Collections(props: ICollectionsProps): JSX.Element {
	const { collections, notFound } = props;

	return notFound ? (
		<Error404 />
	) : (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className={styles.heading} />
			<Description text={DESCRIPTION} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem
						key={`${collection._id}-${collection.slug}`}
						collection={collection}
					/>
				))}
			</section>
		</Meta>
	);
}
