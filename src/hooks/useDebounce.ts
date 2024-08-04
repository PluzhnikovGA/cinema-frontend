'use client';

import { useEffect, useState } from 'react';

interface IUseDebounceProps {
	searchTerm: string;
	delay: number;
}

export function useDebounce(props: IUseDebounceProps): string {
	const { searchTerm, delay } = props;
	const [debounceValue, setDebounceValue] = useState<string>(searchTerm);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(searchTerm);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [delay, searchTerm]);

	return debounceValue;
}
