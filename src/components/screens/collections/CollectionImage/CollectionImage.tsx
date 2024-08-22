import Image from 'next/image';

import { ICollection } from '../Collections';

interface ICollectionImageProps {
	collection: ICollection;
}

export default function CollectionImage(
	props: ICollectionImageProps
): JSX.Element {
	const {
		collection: { title, image },
	} = props;
	return <Image alt={title} src={image} fill draggable={false} />;
}
