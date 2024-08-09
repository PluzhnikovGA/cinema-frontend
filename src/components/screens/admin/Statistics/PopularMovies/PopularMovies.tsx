'use client';

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { SkeletonLoader } from '@/ui/SkeletonLoader/SkeletonLoader';
import { SubHeading } from '@/ui/SubHeading/SubHeading';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMovieUrl } from '@/configs/url.config';

import styles from './PopularMovies.module.scss';

const TITLE = 'The most popular movie';

export default function PopularMovies() {
	const { isLoading, data } = useQuery(
		'mostPopularMovies',
		() => MovieService.getMostPopular(),
		{
			select: (data): IMovie => data[0],
		}
	);
	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title={TITLE} />
			{isLoading ? (
				<SkeletonLoader
					count={1}
					name="popularMovie"
					firstItemClassName="h-48"
				/>
			) : (
				data && (
					<>
						<h3 className={styles.title}>Opened {data.countOpened} times</h3>
						<Link href={getMovieUrl(data.slug)}>
							<Image
								width={285}
								height={160}
								src={data.bigPoster}
								alt={data.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	);
}
