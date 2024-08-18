import Image from 'next/image';
import { FC } from 'react';

import styles from './Banner.module.scss';

interface IBannerProps {
	image: string;
	Detail?: FC;
}

export default function Banner(props: IBannerProps): JSX.Element {
	const { image, Detail } = props;

	return (
		<div className={styles.banner}>
			<Image
				src={image}
				draggable={false}
				fill
				className="image-like-bg object-top"
				unoptimized
				priority
				alt="banner"
			/>
			{Detail && <Detail />}
		</div>
	);
}
