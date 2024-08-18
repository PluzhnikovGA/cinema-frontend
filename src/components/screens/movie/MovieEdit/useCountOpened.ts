'use client';

import { useEffect } from 'react';
import { useMutation } from 'react-query';

import { MovieService } from '@/services/movie.service';

export default function useCountOpened(slug: string) {
	const { mutateAsync } = useMutation('updateCountOpenedMovie', () =>
		MovieService.updateCountOpenedMovie(slug)
	);

	useEffect(() => {
		mutateAsync();
	}, []);
}
