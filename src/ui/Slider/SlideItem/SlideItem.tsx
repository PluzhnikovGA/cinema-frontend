'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ISlide } from '../slider.interface';

import styles from './SlideItem.module.scss';

interface ISlideItemProps {
	slide: ISlide;
	buttonTitle?: string;
}

export default function SlideItem(props: ISlideItemProps): JSX.Element {
	const { slide, buttonTitle = 'Watch' } = props;

	const { push } = useRouter();

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					layout="fill"
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
				/>
			)}

			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<button className={styles.button} onClick={() => push(slide.link)}>
					{buttonTitle}
				</button>
			</div>
		</div>
	);
}
