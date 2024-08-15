import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { IGalleryItem } from '../gallery.interface';

import styles from './GalleryItem.module.scss';

interface IGalleryItemProps {
	item: IGalleryItem;
	variant: 'vertical' | 'horizontal';
}

export default function GalleryItem(props: IGalleryItemProps): JSX.Element {
	const { item, variant } = props;
	return (
		<Link
			href={item.link}
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.horizontal]: variant === 'horizontal',
				[styles.vertical]: variant === 'vertical',
			})}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				fill
				draggable={false}
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}>{item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	);
}
