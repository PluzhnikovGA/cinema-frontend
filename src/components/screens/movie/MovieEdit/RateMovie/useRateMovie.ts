import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { RatingService } from '@/services/rating.service';

import { toastError } from '@/utils/toastError';

export default function useRateMovie(movieId: string) {
	const [rating, setRating] = useState<number>(0);
	const [isSended, setIsSended] = useState<boolean>(false);

	const { refetch } = useQuery(
		['yourMovieRating', movieId],
		() => RatingService.getRating(movieId),
		{
			onSuccess: ({ data }) => setRating(data),
			onError: (error) => {
				toastError(error, 'Get rating');
			},
			enabled: !!movieId,
		}
	);

	const { mutateAsync } = useMutation(
		'setRatingMovie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError: (error) => {
				toastError(error, 'Rate movie');
			},
			onSuccess() {
				toastr.success('Rate movie', 'You have successfully rated!');
				setIsSended(true);
				refetch();

				setTimeout(() => {
					setIsSended(false);
				}, 2400);
			},
		}
	);

	const handleClick = async (nextValue: number) => {
		setRating(nextValue);
		await mutateAsync({ value: nextValue });
	};

	return {
		isSended,
		rating,
		handleClick,
	};
}
