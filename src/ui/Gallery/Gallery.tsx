import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';
import { IGalleryItem } from './gallery.interface';

interface IGalleryProps {
	items: IGalleryItem[];
}

export default function Gallery(props: IGalleryProps): JSX.Element {
	const { items } = props;

	return (
		<div className={styles.gallery}>
			{items.map((item: IGalleryItem) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	);
}
