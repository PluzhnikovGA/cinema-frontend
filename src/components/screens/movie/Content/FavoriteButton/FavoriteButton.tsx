'use client';

import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import useFavorites from '@/components/screens/favorites/useFavorites';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toastError';

import styles from './FavoriteButton.module.scss';
import HeartImage from './heart-animation.png';

interface IFavoriteButtonProps {
	movieId: string;
}

export default function FavoriteButton(
	props: IFavoriteButtonProps
): JSX.Element {
	const { movieId } = props;
	const [isSmashed, setIsSmashed] = useState<boolean>(false);

	const { favoriteMovies, refetch } = useFavorites();

	useEffect(() => {
		if (!favoriteMovies) return;

		const isHasMovie = favoriteMovies.some((movie) => movie._id === movieId);

		if (isSmashed !== isHasMovie) setIsSmashed(!isSmashed);
	}, [favoriteMovies, isSmashed, movieId]);

	const { mutateAsync } = useMutation(
		'updateFavorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError(error) {
				toastError(error, 'Update favorite list');
			},
			onSuccess() {
				setIsSmashed(!isSmashed);
				refetch();
			},
		}
	);

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	);
}
