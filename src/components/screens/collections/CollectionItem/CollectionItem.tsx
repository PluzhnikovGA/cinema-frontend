import cn from 'classnames';
import Link from 'next/link';

import CollectionImage from '../CollectionImage/CollectionImage';
import { ICollection } from '../Collections';

import styles from './CollectionItem.module.scss';

interface ICollectionItemProps {
	collection: ICollection;
}

export default function CollectionItem(
	props: ICollectionItemProps
): JSX.Element {
	const { collection } = props;

	return (
		<Link href={collection.slug} className={styles.collection}>
			<CollectionImage collection={collection} />

			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>

			<div className={cn(styles.behind, styles.second)}>
				<CollectionImage collection={collection} />
			</div>

			<div className={cn(styles.behind, styles.third)}>
				<CollectionImage collection={collection} />
			</div>
		</Link>
	);
}
