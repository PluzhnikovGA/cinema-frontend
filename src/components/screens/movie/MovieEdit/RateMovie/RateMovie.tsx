'use client';

import StarRating from 'react-star-rating-component';

import AuthButton from '@/ui/VideoPlayer/AuthPlaceholder/AuthButton/AuthButton';

import { useAuth } from '@/hooks/useAuth';

import styles from './RateMovie.module.scss';
import useRateMovie from './useRateMovie';

interface IRateMovieProps {
	movieId: string;
	slug: string;
}

export default function RateMovie(props: IRateMovieProps): JSX.Element {
	const { movieId, slug } = props;
	const { user } = useAuth();

	const { isSended, rating, handleClick } = useRateMovie(movieId);

	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie?</h3>
			<p>Rating improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating!</div>
					) : (
						<StarRating
							name="start-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	);
}
