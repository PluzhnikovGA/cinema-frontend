'use client';

import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.service';

export function useSearch() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedSearch = useDebounce({ searchTerm, delay: 500 });

	const { isSuccess, data } = useQuery(
		['searchMovieList', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return { isSuccess, handleSearch, data, searchTerm };
}
